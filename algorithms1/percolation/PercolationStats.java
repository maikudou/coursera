import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;

public class PercolationStats {
    private Percolation perc;
    private double[] results;
    private int times;
    private int openCount;
    private int randomRow;
    private int randomColumn;

    public PercolationStats(int N, int T) {
        if (N <= 0 || T < 0) {
            throw new java.lang.IllegalArgumentException();
        }
        results = new double[T];
        times = T;
        for (int i = 0; i < T; i++) {
            perc = new Percolation(N);
            openCount = 0;
            while (!perc.percolates()) {
                randomRow = StdRandom.uniform(1, N+1);
                randomColumn = StdRandom.uniform(1, N+1);
                if (!perc.isOpen(randomRow, randomColumn)) {
                    perc.open(randomRow, randomColumn);
                    openCount++;
                }
            }
            results[i] = openCount/(double) (N*N);
        }

        System.out.printf("mean                     = %f%n", mean());
        System.out.printf("stdev                    = %f%n", stddev());
        System.out.printf("95%% confidence interval  = %f, %f%n", confidenceLo(), confidenceHi());
        System.out.println(perc.getCount());
    }

    public double mean() {
        return StdStats.mean(results);
    }

    public double stddev() {
        return StdStats.stddev(results);
    }

    public double confidenceLo() {
        return mean()-1.96*stddev()/java.lang.Math.sqrt(times);
    }

    public double confidenceHi() {
        return mean()+1.96*stddev()/java.lang.Math.sqrt(times);
    }

    public static void main(String[] args) {
        new PercolationStats(Integer.parseInt(args[0]), Integer.parseInt(args[1]));
    }
}