import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;
import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class PercolationStats {
    private Percolation perc;
    private double[] results;
    private double result;
    private int times;
    public PercolationStats(int N, int T){
        if(N <= 0 || T < 0){
            throw new java.lang.IllegalArgumentException();
        }
        results = new double[T];
        times = T;
        for(int i=0; i<T; i++){
            perc = new Percolation(N);
            while(!perc.percolates()){
                perc.open(StdRandom.uniform(1, N+1), StdRandom.uniform(1, N+1));
            }
            results[i] = perc.count()/(double)(N*N);
        }

        System.out.printf("mean                     = %f%n", mean());
        System.out.printf("stdev                    = %f%n", stddev());
        System.out.printf("95%% confidence interval  = %f, %f%n", confidenceLo(), confidenceHi());
    }
    public double mean(){
        return StdStats.mean(results);
    }
    public double stddev(){
        return StdStats.stddev(results);
    }
    public double confidenceLo(){
        return mean()-1.96*stddev()/java.lang.Math.sqrt(times);
    }
    public double confidenceHi(){
        return mean()+1.96*stddev()/java.lang.Math.sqrt(times);
    }

    public static void main(String[] args){
        PercolationStats percStats = new PercolationStats(Integer.parseInt(args[0]), Integer.parseInt(args[1]));
    }
}