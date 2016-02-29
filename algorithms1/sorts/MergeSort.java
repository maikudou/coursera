public class MergeSort {
    private static int mergeCount = 0;
    private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi) {
        for (int k = lo; k <= hi; k++) {
            aux[k] = a[k];
        }

        int i = lo, j = mid + 1;

        for (int k = lo; k <= hi; k++) {
            if      (i > mid)               a[k] = aux[j++];
            else if (j > hi)                a[k] = aux[i++];
            else if (less(aux[j], aux[i]))  a[k] = aux[j++];
            else                            a[k] = aux[i++];
        }
    }

    private static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
        if (hi <= lo) return;
        int mid = lo + (hi - lo)/2;
        sort(a, aux, lo, mid);

        // for (int i = 0; i < a.length; i++) {
        //     System.out.print(a[i]);
        //     System.out.print(" ");
        // }
        // System.out.printf("%n");

        sort(a, aux, mid+1, hi);

        // for (int i = 0; i < a.length; i++) {
        //     System.out.print(a[i]);
        //     System.out.print(" ");
        // }
        // System.out.printf("%n");

        mergeCount++;
        merge(a, aux, lo, mid, hi);

        // for (int i = 0; i < a.length; i++) {
        //     System.out.print(a[i]);
        //     System.out.print(" ");
        // }
        // System.out.printf("%n");

        if (mergeCount == 7) {
            for (int i = 0; i < a.length; i++) {
                System.out.print(a[i]);
                System.out.print(" ");
            }
            System.out.printf("%n");
        }
    }

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    public static void sort(Comparable[] a) {
        Comparable[] aux = new Comparable[a.length];
        sort(a, aux, 0, a.length-1);
    }

    public static void main(String[] args) {
        Comparable[] list = new Comparable[args.length];
        for (int i = 0; i < args.length; i++) {
            list[i]=args[i];
        }

        sort(list);

        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i]);
            System.out.print(' ');
        }
        System.out.printf("%n");
    }
}