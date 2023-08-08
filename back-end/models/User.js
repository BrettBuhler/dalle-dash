const { createClient } = require('@supabase/supabase-js')

require('dotenv').config()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

const GET_USER_BY_ID = async (userId) => {
    let {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
    if (error) {
        console.log("error in getUserById:", error)
        throw new Error(error)
    }
    if (data.length > 1 || data.length === 0){
        throw new Error("Issues fetching user from DB (getUserById)")
    }
    return data[0]
}

module.exports = {
    checkUser: async (userEmail) => {
        let {data: email, error} = await supabase
            .from('users')
            .select('email')
            .eq('email', userEmail)
        return email
    },
    getUser: async (userEmail) => {
        let {data, error} = await supabase
            .from('users')
            .select('*')
            .eq('email', userEmail)
        if (error) {
            console.log("error in getUser:", error)
            throw new Error(error)
        }
        if (data.length > 1 || data.length === 0){
            throw new Error("Issues fetching user from DB")
        }
        return data[0]
    },
    getUserById: async (userId) => {
        const resUser = await GET_USER_BY_ID(userId)
        return resUser
    },
    addUser: async (email, password) => {
        const {data, error } = await supabase
            .from("users")
            .insert([
                {
                    email: email,
                    password: password
                }
            ])
            .select()
        if (error) {
            console.log("Error in addUser:", error)
            return null
        } else {
            return data[0]
        }
    },
    updateTokensById: async (id, tokens) => {
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('tokens')
            .eq('id', id)
            .single()

        if (fetchError) {
            console.log("Fetch Error:", fetchError)
            return null
        }

        const currentTokens = userData.tokens
        const newTokens = currentTokens + tokens

        const { data: upsertData, error: upsertError } = await supabase
            .from('users')
            .upsert([{ id: id, tokens: newTokens }], { onConflict: ['id'] })

        if (upsertError) {
            console.log("Upsert Error:", upsertError)
            return null
        }
        const resUser = await GET_USER_BY_ID(id)
        return resUser
    },
    addImage: async (id, prompt, fileName) => {
        const {data, error} = await supabase
            .from('image_base')
            .insert({
                user_id: id,
                prompt: prompt,
                file_name: fileName
            })
        if (error) {
            console.error(error)
            return false
        }
        console.log('Added new image to table')
        return true
    },
    getImageById: async (id) => {
        const {data, error} = await supabase
            .from('image_base')
            .select('file_name')
            .eq('user_id', id)
        if (error) {
            console.log('Error in getImageById:', error)
            return false
        }
        return data.map(item => item.file_name)
    }
}