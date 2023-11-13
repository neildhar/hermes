/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %shermes -O0 -fno-inline -typed -dump-ir %s | %FileCheckOrRegen --match-full-lines %s

'use strict';

class C {
  override(): number {
    return 1;
  }
  override2(x: number): number|string {
    return 1;
  }
}

class D extends C {
  constructor() {
    'use strict'
    super();
  }
  override(): number {
    return 2;
  }
  override2(x: number|string): number {
    return 2;
  }
}

new D().override();

// Auto-generated content below. Please do not modify manually.

// CHECK:function global(): any
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = AllocStackInst (:any) $?anon_0_ret: any
// CHECK-NEXT:       StoreStackInst undefined: undefined, %0: any
// CHECK-NEXT:  %2 = CreateFunctionInst (:object) %""(): any
// CHECK-NEXT:  %3 = AllocObjectInst (:object) 0: number, empty: any
// CHECK-NEXT:  %4 = CallInst [njsf] (:any) %2: object, empty: any, empty: any, undefined: undefined, undefined: undefined, %3: object
// CHECK-NEXT:       StoreStackInst %4: any, %0: any
// CHECK-NEXT:  %6 = LoadStackInst (:any) %0: any
// CHECK-NEXT:       ReturnInst %6: any
// CHECK-NEXT:function_end

// CHECK:function ""(exports: any): any
// CHECK-NEXT:frame = [exports: any, C: any, D: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %exports: any
// CHECK-NEXT:       StoreFrameInst %0: any, [exports]: any
// CHECK-NEXT:       StoreFrameInst undefined: undefined, [C]: any
// CHECK-NEXT:       StoreFrameInst undefined: undefined, [D]: any
// CHECK-NEXT:  %4 = CreateFunctionInst (:object) %C(): any
// CHECK-NEXT:       StoreFrameInst %4: object, [C]: any
// CHECK-NEXT:  %6 = CreateFunctionInst (:object) %override(): any
// CHECK-NEXT:  %7 = CreateFunctionInst (:object) %override2(): any
// CHECK-NEXT:  %8 = AllocObjectLiteralInst (:object) "override": string, %6: object, "override2": string, %7: object
// CHECK-NEXT:       StorePropertyStrictInst %8: object, %4: object, "prototype": string
// CHECK-NEXT:  %10 = LoadFrameInst (:any) [C]: any
// CHECK-NEXT:  %11 = CreateFunctionInst (:object) %D(): any
// CHECK-NEXT:        StoreFrameInst %11: object, [D]: any
// CHECK-NEXT:  %13 = LoadPropertyInst (:object) %10: any, "prototype": string
// CHECK-NEXT:  %14 = CreateFunctionInst (:object) %"override 1#"(): any
// CHECK-NEXT:  %15 = CreateFunctionInst (:object) %"override2 1#"(): any
// CHECK-NEXT:  %16 = AllocObjectLiteralInst (:object) "override": string, %14: object, "override2": string, %15: object
// CHECK-NEXT:        StoreParentInst %13: object, %16: object
// CHECK-NEXT:        StorePropertyStrictInst %16: object, %11: object, "prototype": string
// CHECK-NEXT:  %19 = LoadFrameInst (:any) [D]: any
// CHECK-NEXT:  %20 = LoadPropertyInst (:any) %19: any, "prototype": string
// CHECK-NEXT:  %21 = AllocObjectInst (:object) 0: number, %20: any
// CHECK-NEXT:  %22 = CallInst (:any) %19: any, %D(): any, empty: any, %19: any, %21: object
// CHECK-NEXT:  %23 = LoadParentInst (:object) %21: object
// CHECK-NEXT:  %24 = PrLoadInst (:object) %23: object, 0: number, "override": string
// CHECK-NEXT:  %25 = CallInst [njsf] (:any) %24: object, empty: any, empty: any, undefined: undefined, %21: object
// CHECK-NEXT:        ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function C(): any
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:       ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function override(): any [typed]
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:       ReturnInst 1: number
// CHECK-NEXT:%BB1:
// CHECK-NEXT:       UnreachableInst
// CHECK-NEXT:function_end

// CHECK:function override2(x: number): any [typed]
// CHECK-NEXT:frame = [x: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:number) %x: number
// CHECK-NEXT:       StoreFrameInst %0: number, [x]: any
// CHECK-NEXT:       ReturnInst 1: number
// CHECK-NEXT:%BB1:
// CHECK-NEXT:       UnreachableInst
// CHECK-NEXT:function_end

// CHECK:function D(): any [typed]
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:object) %<this>: object
// CHECK-NEXT:  %1 = LoadFrameInst (:any) [C@""]: any
// CHECK-NEXT:  %2 = CallInst (:any) %1: any, empty: any, empty: any, undefined: undefined, %0: object
// CHECK-NEXT:       ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function "override 1#"(): any [typed]
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:       ReturnInst 2: number
// CHECK-NEXT:%BB1:
// CHECK-NEXT:       UnreachableInst
// CHECK-NEXT:function_end

// CHECK:function "override2 1#"(x: string|number): any [typed]
// CHECK-NEXT:frame = [x: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:string|number) %x: string|number
// CHECK-NEXT:       StoreFrameInst %0: string|number, [x]: any
// CHECK-NEXT:       ReturnInst 2: number
// CHECK-NEXT:%BB1:
// CHECK-NEXT:       UnreachableInst
// CHECK-NEXT:function_end