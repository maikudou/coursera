import edu.princeton.cs.algs4.StdRandom;

public class QuickSort {
    private static int partition(Comparable[] a, int lo, int hi) {
        int i = 0, j=hi+1;
        while (true) {
            while (less(a[++i], a[lo])) {
                if (i == hi) break;
            }

            while (less(a[lo], a[--j])) {
                if (j == lo) break;
            }

            if (i >= j) break;
            exch(a, i, j);
        }

        exch(a, lo, j);
        return j;
    }

    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo ) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j-1);
        sort(a, j+1, hi);
    }

    private static void sort3w(Comparable[] a, int lo, int hi) {
        if (hi <= lo ) return;
        int lt = lo, gt = hi;
        Comparable v = a[lo];
        int i = lo;
        while (i <= gt) {
            int cmp = a[i].compareTo(v);
            if      (cmp < 0) exch(a, lt++, i++);
            else if (cmp > 0) exch(a, i, gt--);
            else              i++;
        }

        for (int k = 0; k < a.length; k++) {
            System.out.print(a[k]);
            System.out.print(" ");
        }
        System.out.printf("%n");


        // sort3w(a, lo, lt-1);
        // sort3w(a, gt+1, hi);
    }

    public static void sort(Comparable[] a) {
        StdRandom.shuffle(a);
        sort(a, 0, a.length-1);
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable swap = a[i];
        a[i] = a[j];
        a[j] = swap;
    }


    public static void main(String[] args) {
        Comparable[] list = new Comparable[args.length];
        for (int i = 0; i < args.length; i++) {
            list[i]=args[i];
        }

        sort3w(list, 0, list.length-1);

        for (int i = 0; i < args.length; i++) {
            list[i]=args[i];
        }

        partition(list, 0, list.length-1);

        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i]);
            System.out.print(" ");
        }
        System.out.printf("%n");

        // sort(list);

        // for (int i = 0; i < list.length; i++) {
        //     System.out.print(list[i]);
        //     System.out.print(' ');
        // }
        // System.out.printf("%n");
    }
}