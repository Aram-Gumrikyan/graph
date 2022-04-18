#include <node.h>
#include <iostream>

using namespace std;

namespace calculate {
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::Number;
  using v8::Value;

  void Sum(const FunctionCallbackInfo<Value>&args) {
    Isolate* isolate = args.GetIsolate();
    // const int limit = 100000000000; // 100_000_000_000
    // for(int i=0; i < limit; i++) { }
    // cout << *isolate.x << endl;

    // auto total = Number::New(isolate,x);
    // args.GetReturnValue().Set(total);
  }

  void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "calc", Sum);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME,Initialize);
}