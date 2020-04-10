#include <napi.h>
#include <iostream>
using namespace Napi;


Array Filter(const CallbackInfo& info) {
  Env env = info.Env();
  Array array = info[0].As<Array>();
  Function callback = info[1].As<Function>();
  Array result = Array::New(env);
  for (size_t i = 0, j = 0; i < array.Length(); i++) {
    Boolean ret = callback.Call(array, { array.Get(i), Number::New(env, i), array }).As<Boolean>();
    if (ret.Value()) {
      result.Set(j++, array.Get(i));
    }
  }
  return result;
}

String Hello(const CallbackInfo& info) {
  std::cout<<"hello world"<<std::endl;
  return String::New(info.Env(), "hello world");
}

Object ParseAST(const CallbackInfo& info) {
  Env env = info.Env();
  String source = info[0].As<String>();
  Object obj = Object::New(env);

  std::string str = source;
  std::string result;
  for (std::string::reverse_iterator it = str.rbegin(); it != str.rend(); it++) {
    result.push_back(*it);
  }
  obj.Set("token", String::New(env, result));
  obj.Set("id", Number::New(env, 2));
  return obj;
}

Object Init(Env env, Object exports) {

  exports.Set("filter", Function::New(env, Filter));
  exports.Set("hello", Function::New(env, Hello));
  exports.Set("parseAST", Function::New(env, ParseAST));
  return exports;
}

NODE_API_MODULE(test_addon, Init)