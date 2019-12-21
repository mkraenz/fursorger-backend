/**
 * Decorator factory. On call of the decorated method, the wrapperFn gets executed with the decorated method as
 * its parameter. The result of the decoratedMethod is returned to
 * the wrapperFn (which might pass through the result, or return something else)
 */
export const logInput: MethodDecorator = (
    target,
    key,
    descriptor: TypedPropertyDescriptor<any>,
) => {
    const originalMethod = descriptor.value;
    descriptor.value = new Proxy(originalMethod, {
        apply: async (targetX, thisArg, args) => {
            console.log(
                `calling ${target.constructor.name}.${String(
                    key,
                )}(args) with args ${JSON.stringify(args)}`,
            );
            return targetX.apply(thisArg, args);
        },
    });
    return descriptor;
};
