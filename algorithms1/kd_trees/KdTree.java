import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.RectHV;
import edu.princeton.cs.algs4.StdDraw;
import edu.princeton.cs.algs4.Stack;
import edu.princeton.cs.algs4.Queue;
import edu.princeton.cs.algs4.In;

public class KdTree {
    private static class Node {
        private Point2D p;
        private RectHV rect;
        private Node lb;
        private Node rt;
        private boolean orientation;
    }
    private Node root;
    private int size;

    public KdTree() {
        size = 0;
    }

    private void insertNewNode(Node node, Point2D point, boolean orientation) {
        if (!point.equals(node.p)) {
            if (orientation) { //vertical
                if (point.x() < node.p.x()) {
                    if (node.lb != null) {
                        insertNewNode(node.lb, point, !orientation);
                    } else {
                        createNewNode(node, point, true);
                    }
                }
                if (point.x() >= node.p.x()) {
                    if (node.rt != null) {
                        insertNewNode(node.rt, point, !orientation);
                    } else {
                        createNewNode(node, point, false);
                    }
                }
            } else { //horizontal
                if (point.y() < node.p.y()) {
                    if (node.lb != null) {
                        insertNewNode(node.lb, point, !orientation);
                    } else {
                        createNewNode(node, point, true);
                    }
                }
                if (point.y() >= node.p.y()) {
                    if (node.rt != null) {
                        insertNewNode(node.rt, point, !orientation);
                    } else {
                        createNewNode(node, point, false);
                    }
                }
            }
        }
    }

    private void createNewNode(Node node, Point2D point, boolean left) {
        size++;
        Node newNode = new Node();
        newNode.p = point;
        newNode.orientation = !node.orientation;
        if (!newNode.orientation) {
            if (left) {
                newNode.rect = new RectHV(node.rect.xmin(),
                                            node.rect.ymin(),
                                            node.p.x(),
                                            node.rect.ymax());
            } else {
                newNode.rect = new RectHV(node.p.x(),
                                            node.rect.ymin(),
                                            node.rect.xmax(),
                                            node.rect.ymax());
            }
        } else {
            if (left) {
                newNode.rect = new RectHV(node.rect.xmin(),
                                            node.rect.ymin(),
                                            node.rect.xmax(),
                                            node.p.y());
            } else {
                newNode.rect = new RectHV(node.rect.xmin(),
                                            node.p.y(),
                                            node.rect.xmax(),
                                            node.rect.ymax());
            }
        }

        if (left) {
            node.lb = newNode;
        } else {
            node.rt = newNode;
        }
    }

    private Iterable<Node> levelOrder() {
        Stack<Node> order = new Stack<Node>();
        Queue<Node> roots = new Queue<Node>();

        roots.enqueue(root);
        Node next = roots.dequeue();
        while (next != null) {
            order.push(next);
            if (next.lb != null) {
                roots.enqueue(next.lb);
            }
            if (next.rt != null) {
                roots.enqueue(next.rt);
            }
            if (roots.size() > 0) {
                next = roots.dequeue();
            } else {
                next = null;
            }
        }
        return order;
    }

    private boolean treeContainsNode(Node node, Point2D point, boolean orientation) {
        if (point.equals(node.p)) {
            return true;
        } else {
            if (orientation) { //vertical
                if (point.x() < node.p.x()) {
                    if (node.lb != null) {
                        return treeContainsNode(node.lb, point, !orientation);
                    }
                }
                if (point.x() >= node.p.x()) {
                    if (node.rt != null) {
                        return treeContainsNode(node.rt, point, !orientation);
                    }
                }
            } else { //horizontal
                if (point.y() < node.p.y()) {
                    if (node.lb != null) {
                        return treeContainsNode(node.lb, point, !orientation);
                    }
                }
                if (point.y() >= node.p.y()) {
                    if (node.rt != null) {
                        return treeContainsNode(node.rt, point, !orientation);
                    }
                }
            }
            return false;
        }
    }

    public boolean isEmpty() {
        return root == null;
    }

    public int size() {
        return size;
    }

    public void insert(Point2D p) {
        if (p == null) throw new NullPointerException();
        if (root != null) {
            insertNewNode(root, p, true);
        } else {
            root = new Node();
            root.p = p;
            root.orientation = true;
            root.rect = new RectHV(0, 0, 1, 1);
            size++;
        }
    }

    public boolean contains(Point2D p) {
        if (p == null) throw new NullPointerException();
        if (isEmpty()) return false;
        return treeContainsNode(root, p, true);
    }

    public void draw() {
        for (Node node : levelOrder()) {
            StdDraw.setPenRadius();

            if (node.orientation) {
                StdDraw.setPenColor(StdDraw.RED);
                StdDraw.line(node.p.x(), node.rect.ymin(),
                             node.p.x(), node.rect.ymax());
            } else {
                StdDraw.setPenColor(StdDraw.BLUE);
                StdDraw.line(node.rect.xmin(), node.p.y(),
                             node.rect.xmax(), node.p.y());
            }

            StdDraw.setPenColor(StdDraw.BLACK);
            StdDraw.setPenRadius(.01);
            StdDraw.point(node.p.x(), node.p.y());
        }
    }

    public Iterable<Point2D> range(RectHV rect) {
        if (rect == null) throw new NullPointerException();
        Stack<Point2D> rangeStack = new Stack<Point2D>();

        Queue<Node> roots = new Queue<Node>();

        roots.enqueue(root);
        Node next = roots.dequeue();
        while (next != null) {
            if (next.rect.intersects(rect)) {
                if (rect.contains(next.p)) {
                    rangeStack.push(next.p);
                }
                if (next.lb != null) {
                    roots.enqueue(next.lb);
                }
                if (next.rt != null) {
                    roots.enqueue(next.rt);
                }
            }
            if (roots.size() > 0) {
                next = roots.dequeue();
            } else {
                next = null;
            }
        }

        return rangeStack;
    }

    public Point2D nearest(Point2D p) {
        if (p == null) throw new NullPointerException();
        if (isEmpty()) return null;
        Point2D nearest = root.p;
        double distance = root.p.distanceSquaredTo(p);
        Queue<Node> roots = new Queue<Node>();

        roots.enqueue(root);
        Node next = roots.dequeue();

        while (next != null) {
            if (next.rect.distanceSquaredTo(p) < distance) {
                double newDistance = next.p.distanceSquaredTo(p);
                if (newDistance < distance) {
                    distance = newDistance;
                    nearest = next.p;
                }
                if (next.lb != null) {
                    roots.enqueue(next.lb);
                }
                if (next.rt != null) {
                    roots.enqueue(next.rt);
                }
            }
            if (roots.size() > 0) {
                next = roots.dequeue();
            } else {
                next = null;
            }
        }
        return nearest;
    }

    public static void main(String[] args) {
        String filename = args[0];
        In in = new In(filename);

        StdDraw.show(0);

        KdTree tree = new KdTree();
        while (!in.isEmpty()) {
            double x = in.readDouble();
            double y = in.readDouble();
            Point2D p = new Point2D(x, y);
            tree.insert(p);
        }

        StdDraw.clear();
        tree.draw();

        StdDraw.show(0);
        StdDraw.show(40);
    }
}