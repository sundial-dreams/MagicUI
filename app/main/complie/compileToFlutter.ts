import { Compiler, compileToJson } from './compile';
import { TYPES } from './contants';

export class CompileToFlutter extends Compiler {
  compile(code: string): string | string[] {
    const jsonObject = compileToJson(code);
    const flutterCode = (`import 'package:flutter/material.dart';
   
void main() => runApp(new MyApp());   
    
class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
       title: 'my app',
       home: Material(
         child: ${compileToFlutterToken(jsonObject)}
       )
    );
  }
}    
`);
    return [flutterCode]
  }
}


function compileToFlutterToken(obj: any) {
  switch (obj.type) {
    case TYPES.WIDGET: {
      return (`Container(
      child: Stack(children: [
         ${obj.children.map((v: any) => compileToFlutterToken(v))}
      ]),
      width: 100,
      height: 100,
      color: Color(0x${obj.background.fill.replace(/^#/, '')})      
)`);
    }
    case TYPES.SHAPE: {
      switch (obj.name) {
        case TYPES.SHAPE.RECT: {
          return (`Container(
)`)
        }
        case TYPES.SHAPE.CIRCLE: {

        }
      }
    }
    default: {
      return ''
    }
  }
}