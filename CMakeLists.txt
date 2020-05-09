cmake_minimum_required(VERSION 3.13)
project(autoui)
set(CMAKE_CXX_STANDARD 14)

include_directories(/users/dengpengfei/.node-gyp/12.16.2/include/node)
include_directories(node_modules/node-addon-api)
add_executable(autoui native/main.cpp native/compile/compile.cpp native/compile/compile.h native/parse/parse.cpp native/parse/parse.h native/ast/ast.cpp native/ast/ast.h)