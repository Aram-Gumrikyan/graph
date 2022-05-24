#include <node.h>
#include <iostream>
#include <cmath>
#include "graph.h"

using namespace std;

namespace calculate
{
  using v8::Array;
  using v8::Context;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::MaybeLocal;
  using v8::Number;
  using v8::Object;
  using v8::String;
  using v8::Value;

  void EnterPoints(const FunctionCallbackInfo<Value> &args)
  {
    Graph *graph = new Graph(args);
    args.GetReturnValue().Set(graph->EnterPoints());
  }

  void CorridorPoints(const FunctionCallbackInfo<Value> &args)
  {
    Graph *graph = new Graph(args);
    args.GetReturnValue().Set(graph->CorridorPoints());
  }

  void ExitPoints(const FunctionCallbackInfo<Value> &args)
  {
    Graph *graph = new Graph(args);
    args.GetReturnValue().Set(graph->ExitPoints());
  }

  void Initialize(Local<Object> exports)
  {
    NODE_SET_METHOD(exports, "enterPoints", EnterPoints);
    NODE_SET_METHOD(exports, "corridorPoints", CorridorPoints);
    NODE_SET_METHOD(exports, "exitPoints", ExitPoints);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
}