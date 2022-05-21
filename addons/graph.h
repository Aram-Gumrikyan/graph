#ifndef GRAPH_H
#define GRAPH_H

#include <node.h>

namespace calculate
{
  typedef v8::Local<v8::Array> JsArray;

  class Graph
  {
  public:
    Graph(const v8::FunctionCallbackInfo<v8::Value> &args);
    JsArray EnterPoints();
    JsArray CorridorPoints();
    JsArray ExitPoints();

  private:
    v8::Isolate *isolate;
    v8::Local<v8::Context> context;
    JsArray input;
    unsigned int inputLength;
  };
}
#endif