#include <node_api.h>
#include <node.h>
#include <napi.h>
#include <iostream>

using namespace Napi;

Napi::String CompileToHtml(Napi::CallbackInfo &info) {

}


Object Init(Env env, Object exports) {
    exports.Set("CompileToHtml", Function::New(env, CompileToHtml));

    return exports;
}

NODE_API_MODULE(test_addon, Init)