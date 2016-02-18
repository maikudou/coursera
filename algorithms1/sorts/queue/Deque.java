public class Deque<Item> implements Iterable<Item> {
    private Node first, last = null;
    private int size = 0;

    public Deque() {

    }

    private class Node {
        Item item;
        Node next;
        Node prev;
    }

    public boolean isEmpty() {
        return (first == null || last == null);
    }
    public int size() {
        return size;
    }
    public void addFirst(Item item) {
        if item == null throw new java.lang.NullPointerException();

        Node oldFirst = first;
        first = new Node;
        first.item = item;
        first.prev = null;

        if (isEmpty()) {
            last = first;
            first.next = null;
        } else {
            first.next     = oldFirst;
            oldFirst.prev  = first;
        }
        size++;
    }
    public void addLast(Item item) {
        if item == null throw new java.lang.NullPointerException();

        Node oldLast = last;
        last = new Node();
        last.item = item;
        last.next = null;

        if (isEmpty()) {
            first = last;
            last.prev = null;
        } else  {
            last.prev     = oldLast;
            oldLast.next  = last;
        }
        size++;
    }
    public Item removeFirst() {
        if (!isEmpty()) {
            Item item = first.item;
            first = first.next;

            if (isEmpty()) {
                last = null;
            } else {
                first.prev = null;
            }

            size--;

            return item;
        } else {
            throw new java.util.NoSuchElementException();
        }
    }
    public Item removeLast() {
        if (!isEmpty()) {
            Item item = last.item;
            last = last.prev;

            if (isEmpty()) {
                first = null;
            } else {
                last.next = null;
            }

            size--;

            return item;
        } else {
            throw new java.util.NoSuchElementException();
        }
    }
    public Iterator<Item> iterator() {
        return new ListIterator();

    }

    private class ListIterator implements Iterator<Item> {
        private Node current = first;
        public boolean hasNext() { return current != null; }
        public void remove() {
            throw new java.lang.UnsupportedOperationException();
        }
        public Item next() {
            Item item = current.item;
            current = current.next;
            return item;
        }
    }

    public static void main(String[] args) {

    }
}