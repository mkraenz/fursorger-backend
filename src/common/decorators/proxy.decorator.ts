export function proxy(
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
