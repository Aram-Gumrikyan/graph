#include "graph.h"

namespace calculate
{
  using v8::Array;
  using v8::Context;
  using v8::Function;
  using v8::FunctionCallbackInfo;
  using v8::FunctionTemplate;
  using v8::Isolate;
  using v8::Local;
  using v8::MaybeLocal;
  using v8::Number;
  using v8::Object;
  using v8::ObjectTemplate;
  using v8::String;
  using v8::Value;

  bool arrayHasItem(Local<Context> context, Local<Array> array, Local<Value> item)
  {
    for (uint32_t i = 0; i < array->Length(); i++)
    {
      if (item == array->Get(context, i).ToLocalChecked())
      {
        return true;
      }
    }

    return false;
  }

  Graph::Graph(const FunctionCallbackInfo<Value> &args)
  {
    isolate = args.GetIsolate();
    context = isolate->GetCurrentContext();
    input = Local<Array>::Cast(args[0]);
    inputLength = input->Length();
  }

  Local<Array> Graph::EnterPoints()
  {
    Local<Array> result = Array::New(isolate);

    for (uint32_t i = 0; i < inputLength; i += 2)
    {
      bool isEnterPoint = true;
      Local<Value> enterPoint = input->Get(context, i).ToLocalChecked();

      bool repeatedEnterPoint = arrayHasItem(context, result, enterPoint);

      if (repeatedEnterPoint)
      {
        continue;
      }

      for (uint32_t j = 1; j < inputLength; j += 2)
      {
        Local<Value> exitPoint = input->Get(context, j).ToLocalChecked();
        if (enterPoint == exitPoint)
        {
          isEnterPoint = false;
        }
      }

      if (!isEnterPoint)
      {
        continue;
      }

      result->Set(context, result->Length(), enterPoint);
    }

    return result;
  }

  Local<Array> Graph::CorridorPoints()
  {
    Local<Array> result = Array::New(isolate);

    for (uint32_t i = 0; i < inputLength; i += 2)
    {
      if (input->Get(context, i + 1).ToLocalChecked() == Number::New(isolate, 0))
      {
        continue;
      }

      bool isCorridorPoint = false;
      Local<Value> enterPoint = input->Get(context, i).ToLocalChecked();

      bool repeatedCorridorPoint = arrayHasItem(context, result, enterPoint);

      if (repeatedCorridorPoint)
      {
        continue;
      }

      for (uint32_t j = 1; j < inputLength; j += 2)
      {
        Local<Value> exitPoint = input->Get(context, j).ToLocalChecked();

        if (enterPoint == exitPoint)
        {
          isCorridorPoint = true;
          break;
        }
      }

      if (!isCorridorPoint)
      {
        continue;
      }

      result->Set(context, result->Length(), enterPoint);
    }

    return result;
  }

  Local<Array> Graph::ExitPoints()
  {
    Local<Array> result = Array::New(isolate);

    for (uint32_t i = 1; i < inputLength; i += 2)
    {
      Local<Value> exitPoint = input->Get(context, i).ToLocalChecked();

      if (exitPoint != Number::New(isolate, 0))
      {
        continue;
      }

      Local<Value> enterPoint = input->Get(context, i - 1).ToLocalChecked();

      bool repeatedExitPoint = arrayHasItem(context, result, enterPoint);

      if (!repeatedExitPoint)
      {
        result->Set(context, result->Length(), enterPoint);
      }
    }

    return result;
  }
}
