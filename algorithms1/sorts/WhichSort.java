import java.io.*;

public class WhichSort {
    public static void main(String[] args) {
        try {
            FileInputStream fstream = new FileInputStream(args[0]);
            BufferedReader br = new BufferedReader(new InputStreamReader(fstream));

            String strLine;

            String[] lines = new String[8];
            int line = 0;

            while ((strLine = br.readLine()) != null) {
                lines[line] = strLine;
                line++;
            }

            br.close();

            System.out.println(lines[0]);

            System.out.print(0+" ");

            String[] input = lines[0].split(" ");
            Comparable[] list = new Comparable[input.length];
            int result = 3;

            for (line = 1; line < lines.length-1; line++) {
                result = 3;
                for (int i = 0; i < input.length; i++) {
                    list[i]=input[i];
                }

                if(InsertionSort.sortFind(list, lines[line])){
                    result = 1;
                }else{
                    for (int k = 0; k < input.length; k++) {
                        list[k]=input[k];
                    }

                    if(SelectionSort.sortFind(list, lines[line])){
                        result = 2;
                    }
                }
                System.out.print(result+" ");
            }
            System.out.printf("4 %n");


        }catch(Exception e){
            System.out.println("Error");
        }
    }
}