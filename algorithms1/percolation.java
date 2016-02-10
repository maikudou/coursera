import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;
import edu.princeton.cs.algs4.WeightedQuickUnionUF;

static int size;
static WeightedQuickUnionUF uf;

public class Percolation {
    public Percolation(int N){
        if(N <= 0){
            throw new java.lang.IllegalArgumentException();
        }
        size = N;
        uf = new WeightedQuickUnionUF(N*N);
    }
    public void open(int i, int j)
    public boolean isOpen(int i, int j)
    public boolean isFull(int i, int j)
    public boolean percolates()

    public static void main(String[] args)
}

public class PercolationStats {
    public PercolationStats(int N, int T)
    public double mean()
    public double stddev()
    public double confidenceLo()
    public double confidenceHi()

    public static void main(String[] args)
}