import { v } from 'convex/values';
import { mutation, query } from './_generated/server';


export const getTeam = query({
    args:{
        email: v.string(),
    },

    handler: async(ctx, args_0) => {
        const results = await ctx.db.query('teams')
        .filter((q)=>q.eq(q.field('createdBy'), args_0.email))
        .collect();

        return results;
    },
})


export const createTeam =  mutation({
    args : {
        teamName : v.string(),
        createdBy : v.string(),
    },

    handler: async(ctx, args_0) => {
        const results = await ctx.db.insert('teams', args_0);
        return results; 
    },
})