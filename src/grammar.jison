/* Lexer */
%lex
%%
\s+                                     { /* skip whitespace */ }
"//".*                                  { /* skip comments */   }
[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?     { return 'NUMBER';      }
"**"                                    { return '**';          }
[-+*/]                                  { return yytext;        }
<<EOF>>                                 { return 'EOF';         }
.                                       { return 'INVALID';     }
/lex

/* Parser */
%start L

%%

/* L -> E eof */
L
    : E EOF
        { return $1; }
    ;

/* E → E1 opad T (addition and subtraction) */
E
    : E '+' T
        { $$ = operate('+', $1, $3); }
    | E '-' T
        { $$ = operate('-', $1, $3); }
    | T
        { $$ = $1; }
    ;

/* T → T1 opmul R (multiplication and division) */
T
    : T '*' R
        { $$ = operate('*', $1, $3); }
    | T '/' R
        { $$ = operate('/', $1, $3); }
    | R
        { $$ = $1; }
    ;

/* R → F opow R (pow) */
R
    : F '**' R
        { $$ = operate('**', $1, $3); }
    | F
        { $$ = $1; }
    ;

F
    : NUMBER
        { $$ = Number(yytext); }
    ;
%%

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '**': return Math.pow(left, right);
    }
}