cmake_minimum_required(VERSION 3.13)
project(autoui)
set(CMAKE_CXX_STANDARD 14)

include_directories(/Users/dengpengfei/.node-gyp/12.6.0/include/node)

add_executable(autoui native/main.cpp)