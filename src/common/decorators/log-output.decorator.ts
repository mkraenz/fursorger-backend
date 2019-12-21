// https://medium.com/iqoqo-engineering/understand-typescript-decorators-in-5-minutes-26ffc6189082
export const logOutput: MethodDecorator = (
    target,
    key,
    descriptor: TypedPropertyDescriptor<any>,
) => {
    const originalMethod = descriptor.value;
    descriptor.value = new Proxy(originalMethod, {
        apply: async (proxyTarget, thisArg, args) => {
            try {
                const result = await proxyTarget.apply(thisArg, args);
                console.log(
                    `${target.constructor.name}.${String(
                        key,
                    )} returned ${JSON.stringify(result)}`,
                );
                return result;
            } catch (error) {
                console.log(
                    `${target.constructor.name}.${String(
                        key,
                    )} threw ${JSON.stringify(error)}`,
                );
                throw error;
            }
        },
    });
    return descriptor;
};
