#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_INPUT_LENGTH 2000


const char *phishing_keywords[] = {
    "login","secure","account","verify","update","confirm","password",
    "signin","suspend","alert","urgent","immediately","act now",
    "limited time","final notice","bank","payment","transaction",
    "invoice","billing","credit card","debit card","ssn",
    "click here","reset password","winner","free","prize","gift","refund"
};


#define KEYWORD_COUNT (sizeof(phishing_keywords)/sizeof(phishing_keywords[0]))

void to_lowercase(char *s){ 
    for(int i=0; s[i]; i++) 
        s[i] = tolower(s[i]); 
}

int main(){
    char msg[MAX_INPUT_LENGTH];
    printf("Enter text to check: ");
    fgets(msg,sizeof(msg),stdin);

    char lower[MAX_INPUT_LENGTH];
    strcpy(lower,msg); 
    to_lowercase(lower);

    int found = 0;
    for(int i=0; i<KEYWORD_COUNT; i++){
        if(strstr(lower, phishing_keywords[i])){ 
            found = 1; 
            break; 
        }
    }

    if(found) 
        printf("Final Risk: Content may be suspicious.\n");
    else 
        printf("Final Risk: SAFE.\n");

    return 0;
}
