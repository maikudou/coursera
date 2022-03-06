public class MaxPQ<Key extends Comparable<Key>> {
    private Key[] pq;
    private int N;

    public MaxPQ(int capacity) {
        N = 0;
        pq = (Key[]) new Comparable[capacity+1];
    }
    public boolean isEmpty() {
        return N == 0;
    }
    public void insert(Key key) {
        pq[++N] = key;
        swim(N);
    }
    public Key delMax() {
        Key max = pq[1];
        exch(1, N--);
        sink(1);
        pq[N+1] = null;
        return max;
    }
    private void swim(int k) {
        while (k>1 && less (k/2, k)) {
            exch(k/2, k);
            k = k/2;
        }
    }
    private void sink(int k) {
        while(k*2 < N) {
            int j = k*2;
            if (j < N && less(j, j+1)) j++;
            if (!less(k, j)) break;
            exch(k, j);
            k = j;
        }
    }
    private boolean less(int i, int j) {
        return pq[i].compareTo(pq[j]) < 0;
    }
    private void exch(int i, int j) {
        Key t = pq[i];
        pq[i] = pq[j];
        pq[j] = t;
    }

    public String toString() {
        String out = "";
        for(int i=1; i<=N; i++) {
            out += pq[i]+" ";
        }
        return out;
    }

    public static void main(String[] args) {
        MaxPQ q = new MaxPQ(13);
        q.insert(98);
        q.insert(97);
        q.insert(41);
        q.insert(92);
        q.insert(51);
        q.insert(33);
        q.insert(39);
        q.insert(42);
        q.insert(63);
        q.insert(13);

        System.out.println(q.toString());

        q.insert(86);
        q.insert(38);
        q.insert(47);

        System.out.println(q.toString());

        q = new MaxPQ(13);

        q.insert(94);
        q.insert(79);
        q.insert(92);
        q.insert(44);
        q.insert(58);
        q.insert(22);
        q.insert(50);
        q.insert(23);
        q.insert(19);
        q.insert(17);

        System.out.println(q.toString());
        q.delMax();
        q.delMax();
        q.delMax();

        System.out.println(q.toString());
    }
}