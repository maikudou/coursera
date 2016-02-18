import edu.princeton.cs.algs4.StdRandom;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class RandomizedQueue<Item> implements Iterable<Item> {
    private Node first, last = null;
    private int N = 0;

    public RandomizedQueue() {
        first = null;
        N = 0;
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
        return N;
    }
    public void enqueue(Item item) {
        if(item == null) throw new java.lang.NullPointerException();

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
        N++;
    }
    public Item dequeue() {
        if (!isEmpty()) {
            int index = StdRandom.uniform(0, N);

            Node current = first;
            for(int currenIndex = 0; currenIndex < index; currenIndex++){
                current = current.next;
            }

            Item item = current.item;

            if (index == 0) {
                first = current.next;
                if (first != null) first.prev = null;
            }
            if (index == N-1) {
                last = current.prev;
                if (last != null) last.next = null;
            }

            if (current.prev != null) {
                current.prev.next = current.next;
            }
            if (current.next != null) {
                current.next.prev = current.prev;
            }

            N--;
            return item;

        } else {
            throw new java.util.NoSuchElementException();
        }
    }

    public Item sample() {
        if (!isEmpty()) {
            int index = StdRandom.uniform(0, N);
            Node current = first;
            for(int currenIndex = 0; currenIndex < index; currenIndex++){
                current = current.next;
            }
            return current.item;
        } else {
            throw new java.util.NoSuchElementException();
        }
    }

    public Iterator<Item> iterator() {
        return new ListIterator();
    }

    private class ListIterator implements Iterator<Item> {
        private Node current;
        private int newN = 0;
        private Node newFirst;

        public ListIterator(){
            Node oldCurrent = first;
            int index = 0;

            while(oldCurrent != null) {
                newN++;
                current = new Node();
                current.next = oldCurrent.next;
                current.prev = oldCurrent.prev;
                current.item = oldCurrent.item;
                oldCurrent = oldCurrent.next;

                if (index == 0) {
                    newFirst = current;
                }
                index++;
            }

            index = StdRandom.uniform(0, newN+1);
            current = newFirst;
            for(int currenIndex = 0; currenIndex < index; currenIndex++){
                current = current.next;
            }
        }

        public boolean hasNext() { return newN > 0; }
        public void remove() {
            throw new java.lang.UnsupportedOperationException();
        }
        public Item next() {
            if (newN > 0) {
                int index = StdRandom.uniform(0, newN);

                current = newFirst;

                for(int currenIndex = 0; currenIndex < index; currenIndex++){
                    current = current.next;
                }

                Item item = current.item;

                if (index == 0) {
                    newFirst = current.next;
                    if (newFirst != null) newFirst.prev = null;
                }

                if (index == newN-1) {
                    Node last = current.prev;
                    if (last != null) last.next = null;
                }

                if (current.prev != null) {
                    current.prev.next = current.next;
                }
                if (current.next != null) {
                    current.next.prev = current.prev;
                }

                newN--;

                return item;

            } else {
                throw new java.util.NoSuchElementException();
            }
        }
    }

    public static void main(String[] args) {
        RandomizedQueue<String> q = new RandomizedQueue<String>();
        for (int i=0; i<args.length; i++) {
            q.enqueue(args[i]);
        }
        // for (int i=0; i<args.length; i++) {
        //     System.out.println(q.dequeue());
        // }
        for (Iterator i = q.iterator(); i.hasNext(); ) {
            String item = (String) i.next();
            System.out.println(item);
        }

    }
}