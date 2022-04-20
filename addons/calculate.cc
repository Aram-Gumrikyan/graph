#include <node.h>
#include <iostream>

using namespace std;

namespace calculate
{
  using v8::Array;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Number;
  using v8::Object;
  using v8::String;
  using v8::Value;

  void Sum(const FunctionCallbackInfo<Value> &args)
  {
    Isolate *isolate = args.GetIsolate();

    // int value = args[0].As<Array>()->Value();

    // cout << value[0] << endl;

    Local<Number> a = Number::New(isolate, 20);
    args.GetReturnValue().Set(a);
  }

  void Initialize(Local<Object> exports)
  {
    NODE_SET_METHOD(exports, "calc", Sum);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
}