#include<stdio.h>
int i=1;
int main()
{  if(i==1){
    printf("Hello");
    i++;
    main();
}
}