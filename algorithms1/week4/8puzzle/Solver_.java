import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.Stack;
import edu.princeton.cs.algs4.MinPQ;
import java.util.Comparator;

public class Solver {
    private Board twin;
    private MinPQ<Node> q;
    private MinPQ<Node> twinQ;
    private boolean solvable = false;
    private Node search;

    private class Node {
        private Board board;
        private Node prev;
        private int moves;
    }

    private Board goal(int n) {
        int[][] array = new int[n][n];
        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                array[i][j]=i*n+j+1;
            }
        }
        array[n-1][n-1]=0;
        return new Board(array);
    }

    public Solver(Board initial) {
        class BoardCompare implements Comparator<Node> {
            public int compare(Node node1, Node node2) {
                int man1 = node1.board.manhattan()+node1.moves;
                int man2 = node2.board.manhattan()+node2.moves;
                if (man1 == man2) {
                    int ham1 = node1.board.hamming();
                    int ham2 = node2.board.hamming();
                    if (ham1 == ham2) {
                        return 0;
                    }
                    if (ham1 < ham2) {
                        return -1;
                    }
                    return 1;
                }
                if (man1 < man2) return -1;
                return 1;
            }
        }
        class BoardCompareReverse implements Comparator<Node> {
            public int compare(Node node1, Node node2) {
                int man1 = node1.board.manhattan();
                int man2 = node2.board.manhattan();
                if (man1 == man2) {
                    int ham1 = node1.board.hamming();
                    int ham2 = node2.board.hamming();
                    if (ham1 == ham2) {
                        return 0;
                    }
                    if (ham1 < ham2) {
                        return 1;
                    }
                    return -1;
                }
                if (man1 < man2) return 1;
                return -1;
            }
        }
        BoardCompare boardCompare = new BoardCompare();
        q = new MinPQ<Node>(boardCompare);
        twinQ = new MinPQ<Node>(boardCompare);

        MinPQ<Node> reverseQ = new MinPQ<Node>(new BoardCompareReverse());

        twin = initial.twin();

        search = new Node();
        search.board = initial;
        search.prev = null;
        search.moves = 0;

        Node twinSearch = new Node();
        twinSearch.board = twin;
        twinSearch.prev = null;
        twinSearch.moves = 0;

        q.insert(search);
        twinQ.insert(twinSearch);

        Board reverse = goal(initial.dimension());
        Node reverseSearch = new Node();
        reverseSearch.board = reverse;
        reverseSearch.prev = null;
        reverseSearch.moves = 0;

        while (!search.board.isGoal() && !twinSearch.board.isGoal() && !reverseSearch.board.equals(search.board)) {
            for (Board neighbor : search.board.neighbors()) {
                if (search.prev == null) {
                    Node neighborNode = new Node();
                    neighborNode.board = neighbor;
                    neighborNode.prev  = search;
                    neighborNode.moves = search.moves+1;
                    q.insert(neighborNode);
                } else if (!neighbor.equals(search.prev.board)) {
                    Node neighborNode = new Node();
                    neighborNode.board = neighbor;
                    neighborNode.prev  = search;
                    neighborNode.moves = search.moves+1;
                    q.insert(neighborNode);
                }
            }

            for (Board twinNeighbor : twinSearch.board.neighbors()) {
                if (twinSearch.prev == null) {
                    Node twinNeighborNode = new Node();
                    twinNeighborNode.board = twinNeighbor;
                    twinNeighborNode.prev  = twinSearch;
                    twinNeighborNode.moves = twinSearch.moves+1;
                    twinQ.insert(twinNeighborNode);
                } else if (!twinNeighbor.equals(twinSearch.prev.board)) {
                    Node twinNeighborNode = new Node();
                    twinNeighborNode.board = twinNeighbor;
                    twinNeighborNode.prev  = twinSearch;
                    twinNeighborNode.moves = twinSearch.moves+1;
                    twinQ.insert(twinNeighborNode);
                }
            }

            for (Board reverseNeighbor : reverseSearch.board.neighbors()) {
                if (reverseSearch.prev == null) {
                    Node reverseNeighborNode = new Node();
                    reverseNeighborNode.board = reverseNeighbor;
                    reverseNeighborNode.prev  = reverseSearch;
                    reverseNeighborNode.moves = reverseSearch.moves+1;
                    reverseQ.insert(reverseNeighborNode);
                } else if (!reverseNeighbor.equals(reverseSearch.prev.board)) {
                    Node reverseNeighborNode = new Node();
                    reverseNeighborNode.board = reverseNeighbor;
                    reverseNeighborNode.prev  = reverseSearch;
                    reverseNeighborNode.moves = reverseSearch.moves+1;
                    reverseQ.insert(reverseNeighborNode);
                }
            }

            if (q.size() > 0) {
                search = (Node) q.delMin();
            }
            if (twinQ.size() > 0) {
                twinSearch = (Node) twinQ.delMin();
            }

            //System.out.print(reverseSearch.board);

            if (reverseSearch.board.equals(search.board)) {
                break;
            }
            if (reverseQ.size() > 0) {
                reverseSearch = (Node) reverseQ.delMin();
            }

        }
        if (search.board.isGoal()) {
            solvable = true;
        } else if (reverseSearch.board.equals(search.board)) {
            System.out.println("gotcha!");
            solvable = true;
            Node searchNext = reverseSearch.prev;
            while (searchNext != null) {
                Node nextNode = searchNext.prev;
                searchNext.moves = search.moves+1;
                searchNext.prev = search;
                search = searchNext;
                searchNext = nextNode;
            }
        }
    }
    public boolean isSolvable() {
        return solvable;
    }
    public int moves() {
        if (isSolvable()) return search.moves;
        return -1;
    }
    public Iterable<Board> solution() {
        if (!isSolvable()) {
            return null;
        }
        Stack<Board> solQ = new Stack<Board>();
        Node searchCopy = search;
        while (searchCopy != null) {
            solQ.push(searchCopy.board);
            searchCopy = searchCopy.prev;
        }
        return solQ;
    }
    public static void main(String[] args) {
           In in = new In(args[0]);
           int N = in.readInt();
           int[][] blocks = new int[N][N];

           for (int i = 0; i < N; i++) {
               for (int j = 0; j < N; j++) {
                   blocks[i][j] = in.readInt();
               }
           }

           Board initial = new Board(blocks);

           // solve the puzzle
           Solver solver = new Solver(initial);

           // print solution to standard output
           if (!solver.isSolvable()) {
               StdOut.println("No solution possible");
           }
           else {
               StdOut.println("Minimum number of moves = " + solver.moves());
               for (Board board : solver.solution())
                   StdOut.println(board);
           }
    }
}