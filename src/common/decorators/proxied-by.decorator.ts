/**
 * Decorator factory. On call of the decorated method, the wrapperFn gets executed with the decorated method as
 * its parameter. The result of the decoratedMethod is returned to
 * the wrapperFn (which might pass through the result, or return something else)
 */
export function ProxiedBy(
    wrapperFn: (decoratedMethod: () => Promise<any>) => Promise<unknown>,
) {
    const decorator: MethodDecorator = (
        target,
        key,
        descriptor: TypedPropertyDescriptor<any>,
    ) => {
        const originalMethod = descriptor.value;
        descriptor.value = new Proxy(originalMethod, {
            apply: async (targetX, thisArg, args) =>
                wrapperFn(() => targetX.apply(thisArg, args)),
        });
        return descriptor;
    };
    return decorator;
}
