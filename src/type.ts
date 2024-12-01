export type PackageJsonDetail = {
    name: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
};

export type Package = {
    name: string;
    path: string;
    dependencies: string[];
    isChanged?: boolean;
};

export type Config = {
    apps: string[];
    dependencies: string[];
    workspacePath: string;
};

export type PackageTree = {
    [key: string]: Package[];
};
