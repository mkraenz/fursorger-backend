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
