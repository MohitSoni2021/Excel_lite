import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getUser = query({
    args:{
        email: v.string()
    },
    handler: async(ctx, args_0) => {
        const results = await ctx.db.query('users')
        .filter((q) => q.eq(q.field('email'), args_0.email))
        .collect();

        return results;
    },
})

export const createUser = mutation({
    args:{
        email: v.string(),
        name: v.string(),
        image: v.string(), 
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.insert('users', args_0)
    },
})