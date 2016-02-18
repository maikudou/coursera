public class InsertionSort {
    public static void sort(Comparable[] a){
        int N = a.length;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j-1])) {
                    exch(a, j, j-1);
                } else {
                    break;
                }
            }
        }
    }

    public static boolean sortFind(Comparable[] a, String like){
        int N = a.length;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j-1])) {
                    exch(a, j, j-1);

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

                } else {
                    break;
                }
            }
        }
        return false;
    }

    public static void sortUntil(Comparable[] a, int exchanges){
        int N = a.length;
        int ex = 0;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j-1])) {
                    exch(a, j, j-1);
                    ex++;
                    if(ex == exchanges){
                        for (int k = 0; k < a.length; k++) {
                            System.out.print(a[k]+" ");
                        }
                        System.out.printf("%n");
                    }
                } else {
                    break;
                }
            }
        }
    }

    public static void sortCount(Comparable[] a){
        int N = a.length;
        int ex = 0;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j-1])) {
                    exch(a, j, j-1);
                    ex++;
                } else {
                    break;
                }
            }
        }
        System.out.println(ex);
    }

    public static void compCount(Comparable[] a){
        int N = a.length;
        int comp = 0;
        for (int i = 0; i < N; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j-1])) {
                    exch(a, j, j-1);
                    comp++;
                } else {
                    comp++;
                    break;
                }
            }
        }
        System.out.println(comp);
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

        compCount(list);

        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i]);
            System.out.print(' ');
        }
        System.out.printf("%n");
    }
}