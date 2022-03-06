public class MergeSort {
    private static Boolean sortFindFound = false;
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
        sort(a, aux, mid+1, hi);
        merge(a, aux, lo, mid, hi);
    }

    private static Boolean sortFind(Comparable[] a, Comparable[] aux, int lo, int hi, String like) {
        String sorted = "";
        for (int k = 0; k < a.length; k++) {
            sorted +=(a[k]);
            if (k < a.length-1) {
                sorted +=(' ');
            }
        }
        if(sorted.equals(like)){
            sortFindFound = true;
        }

        if (hi <= lo) return false;
        int mid = lo + (hi - lo)/2;
        sortFind(a, aux, lo, mid, like);
        sortFind(a, aux, mid+1, hi, like);
        merge(a, aux, lo, mid, hi, like);

        if(sortFindFound) {
            return true;
        } else {
            return false;
        }
    }

    private static void merge(Comparable[] a, Comparable[] aux, int lo, int mid, int hi, String like) {
        String sorted = "";
        for (int k = 0; k < a.length; k++) {
            sorted +=(a[k]);
            if (k < a.length-1) {
                sorted +=(' ');
            }
        }
        if(sorted.equals(like)){
            sortFindFound = true;
        }
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

    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    public static void sort(Comparable[] a) {
        Comparable[] aux = new Comparable[a.length];
        sort(a, aux, 0, a.length-1);
    }

    public static boolean sortFind(Comparable[] a, String like) {
        Comparable[] aux = new Comparable[a.length];
        return sortFind(a, aux, 0, a.length-1, like);
    }

    public static void main(String[] args) {
        Comparable[] list = new Comparable[args.length];
        for (int i = 0; i < args.length; i++) {
            list[i]=args[i];
        }

        sortFind(list, "");

        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i]);
            System.out.print(' ');
        }
        System.out.printf("%n");
    }
}