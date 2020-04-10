{
    "targets": [
        {
            "target_name": "test_addon",
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            # 添加下面的依赖库，根据当前Node.js版本判断
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "defines": [
                "NAPI_DISABLE_CPP_EXCEPTIONS" # 记得加这个宏
            ],
            "sources": [
                "main.cpp"
            ]
        }
    ]
}