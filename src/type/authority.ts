
export interface ListInt{
    name: string   // 权限名称
    roleId: number   // 角色id
    roleList?: ListInt[]   // 子权限, ?号表示可选的,就是可能没有
    viewRole?: string
}

// 权限类
export class InitData{
    id: number  // 权限id
    authority: number[]   // 权限列表
    list: ListInt[] = []
    constructor(id: number, authority: number[]) {
        this.id = id
        this.authority = authority
    }
    treeRef: any
}