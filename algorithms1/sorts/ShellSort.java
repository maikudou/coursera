public class ShellSort {
    public static void sort(Comparable[] a){
        int N = a.length;
        int h = 1;

        while(h < N/3) h = 3*h+1;

        while(h >= 1){
            for (int i = h; i < N; i++) {
                for (int j = i; j >= h && less(a[j], a[j-h]); j -= h) {
                    exch(a, j, j-h);
                }
            }

            h = h/3;
        }

    }

    public static void sortUntil(Comparable[] a, int phase){
        int N = a.length;
        int h = 1;

        while(h < N/3) h = 3*h+1;

        while(h >= 1){
            for (int i = h; i < N; i++) {
                for (int j = i; j >= h && less(a[j], a[j-h]); j -= h) {
                    exch(a, j, j-h);
                }
            }
            if(h == 4){
                for (int k = 0; k < a.length; k++) {
                    System.out.print(a[k]+" ");
                }
                System.out.printf("%n");
            }
            h = h/3;
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