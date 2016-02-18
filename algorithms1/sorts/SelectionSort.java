public class SelectionSort {
    public static void sort(Comparable[] a){
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for (int j = i+1; j < N; j++) {
                if (less(a[j], a[min])) {
                    min = j;
                }
            }
            exch(a, i, min);
        }
    }

    public static boolean sortFind(Comparable[] a, String like){
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for (int j = i+1; j < N; j++) {
                if (less(a[j], a[min])) {
                    min = j;
                }
            }
            exch(a, i, min);

            String sorted = "";
            for (int k = 0; k < a.length; k++) {
                sorted +=(a[k]);
                if (k < a.length-1) {
                    sorted +=(' ');
                }
            }
            if(sorted.equals(like)){
                return true;
            }
        }
        return false;
    }

    public static void sortUntil(Comparable[] a, int exchanges){
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for (int j = i+1; j < N; j++) {
                if (less(a[j], a[min])) {
                    min = j;
                }
            }
            exch(a, i, min);
            if(i+1 == exchanges){
                for (int k = 0; k < a.length; k++) {
                    System.out.print(a[k]+" ");
                }
                System.out.printf("%n");
            }
        }
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

        sortUntil(list, 4);

        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i]);
            System.out.print(' ');
        }
        System.out.printf("%n");
    }
}