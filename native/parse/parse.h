#ifndef AUTOUI_PARSE_H
#define AUTOUI_PARSE_H

#include <iostream>
#include <string>
#include <utility>
#include <stack>
#include <queue>
#include <map>
#include <vector>

using namespace std;

const map<string, bool> ReserveWord;

enum TokenType {
    NUMBER,

};

struct token {
    int pos;
    TokenType type;
};

class parse {
public:
    parse(const string& code) { this->code = code; }

private:
    string code;
};



#endif //AUTOUI_PARSE_H
