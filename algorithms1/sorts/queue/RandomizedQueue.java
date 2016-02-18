import edu.princeton.cs.algs4.StdRandom;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class RandomizedQueue<Item> implements Iterable<Item> {
    private Item[] q;
    private int N;
    private int first;
    private int last;

    public RandomizedQueue() {
        q = (Item[]) new Object[2];
        N = 0;
        first = 0;
        last = 0;
    }

    public boolean isEmpty() {
        return N == 0;
    }
    public int size() {
        return N;
    }

    private void resize(int capacity) {
        assert capacity >= N;
        Item[] temp = (Item[]) new Object[capacity];
        for (int i = 0; i < N; i++) {
            temp[i] = q[i+first];
        }
        q = temp;
        first = 0;
        last  = N;
    }

    private void compact(int index) {
        if (index - first > last - index) {
            for (int i = index; i < last-1; i++) {
                q[i] = q[i+1];
            }
            q[--last] = null;
        } else {
            for (int i = index; i > first; i--) {
                q[i] = q[i-1];
            }
            q[first++] = null;
        }
    }

    public void enqueue(Item item) {
        if (N == q.length) resize(2*q.length);
        q[last++] = item;

        N++;
    }
    public Item dequeue() {
        if (!isEmpty()) {
            int index = StdRandom.uniform(first, last);

            Item item = q[index];
            q[index] = null;
            N--;

            compact(index);

            if (N > 0 && N == q.length/4) resize(q.length/2);
            return item;
        } else {
            throw new java.util.NoSuchElementException();
        }
    }

    public Item sample() {
        if (!isEmpty()) {
            int index = StdRandom.uniform(first, last);
            return q[index];
        } else {
            throw new java.util.NoSuchElementException();
        }
    }

    public Iterator<Item> iterator() {
        return new ArrayIterator();
    }

    private class ArrayIterator implements Iterator<Item> {
        private int i = 0;
        private int[] randomArr;
        public ArrayIterator() {
            randomArr = new int[last - first];
            for (int tempi = first; tempi < last; tempi++) {
                randomArr[tempi - first] = tempi;
            }
            StdRandom.shuffle(randomArr);
        }
        public boolean hasNext()  { return i < N;                               }
        public void remove()      { throw new UnsupportedOperationException();  }

        public Item next() {
            if (!hasNext()) throw new NoSuchElementException();
            Item item = q[randomArr[i]];
            i++;
            return item;
        }
    }

    public static void main(String[] args) {
    }
}