import edu.princeton.cs.algs4.StdIn;

public class Subset {
    public static void main(String[] args) {
        int k = Integer.parseInt(args[0]);
        String[] input = StdIn.readAllStrings();

        RandomizedQueue<String> q = new RandomizedQueue<String>();

        for (int i = 0; i < input.length; i++) {
            q.enqueue(input[i]);
        }

        for (int i = 0; i < k; i++) {
            System.out.println(q.dequeue());
        }
    }
}