import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

export const createFile = mutation({
    args: {
        fileName: v.string(),
        createdBy: v.string(),
        teamId: v.string(),
        archived: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.insert('files', args_0)
    },
})

export const getFiles = query({
    args: {
        teamId: v.string(),
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.query('files')
           .filter((q) => q.eq(q.field('teamId'), args_0.teamId))
           .order('desc')
           .collect()
    }, 
})

export const updateDoument = mutation({
    args: {
         _id: v.id('files'),
         document: v.string(),
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.patch (args_0._id, {document: args_0.document})
    }, 
}) 

export const updateWhiteboard = mutation({
    args: {
         _id: v.id('files'),
         whiteboard: v.string(),
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.patch (args_0._id, {whiteboard: args_0.whiteboard})
    }, 
})

export const getFileById=query({
    args:{
        _id:v.id('files')
    },
    handler:async(ctx, args)=> {
        const result=await ctx.db.get(args._id);
        return result;
    },
})

export const archiveFile = mutation({
    args: {
         _id: v.id('files'),
         archived: v.boolean(),
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.patch (args_0._id, {archived: args_0.archived})
    }
}); 


export const deleteFile = mutation({
    args: {
         _id: v.id('files'),
    },
    handler: async(ctx, args_0) => {
        return await ctx.db.delete(args_0._id);
    }
}); 
