public class QuickFind {
    static int[] id;

    public QuickFind(int N){
        id = new int[N];
        for(int i = 0; i < N; i++)
            id[i] = i;
    }

    public boolean connected(int p, int q){
        return id[p] == id [q];
    }

    public void union(int p, int q){
        int pId = id[p];
        int qId = id[q];
        for(int i = 0; i < id.length; i++){
            if(id[i]==pId)
                id[i]=qId;
        }
    }

    public static void main(String[] args){
        QuickFind qf = new QuickFind(10);

        qf.union(3, 9);
        qf.union(9, 4);
        qf.union(8, 6);
        qf.union(0, 4);
        qf.union(9, 1);
        qf.union(0, 5);

        for(int i=0; i < id.length; i++){
            System.out.print(id[i]);
            System.out.print(' ');
        }
        System.out.print('\n');
    }
}
