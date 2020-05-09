{
    "targets": [
        {
           "target_name": "html_compile",
           "include_dirs": [
              "<!@(node -p \"require('node-addon-api').include\")"
           ],
           "dependencies": [
              "<!(node -p \"require('node-addon-api').gyp\")"
           ],
           "cflags!": ["-fno-exceptions"],
           "cflags_cc!": ["-fno-exceptions"],
           "defines": [
               "NAPI_DISABLE_CPP_EXCEPTIONS" # 记得加这个宏
           ],
           "sources": [
              "compile/compile.cpp",

              "main.cpp",

           ]
        }
    ]
}