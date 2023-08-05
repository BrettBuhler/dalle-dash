const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY    )


const checkUser = async (userEmail) => {
    let {data: email, error} = await supabase
        .from('users')
        .select('email')
        .eq('email', userEmail)
    return email
}

module.exports = {
    addUser: async (req, res) => {
        try {
            const { email, password } = req.body 
            const isUser = await checkUser(email)
            if (isUser.length !== 0){
                console.log(`Email ${email} already existis.`)
                return res.status(404).json({error: "Email Already Exists"})
            }
            const {data, error } = await supabase
                .from("users")
                .insert([
                    {
                        email: email,
                        password: password
                    }
                ])
                .select()
        return res.status(200).json({data : data, error : error})
        } catch (error) {
            console.log("catch error:", error)
            return res.status(500).json({error: "internal server error"})
        }
    },
    updateToken: async (req, res) => {
        try {
            const {id, tokens} = req.body
            const { data: userData, error: fetchError } = await supabase
                .from('users')
                .select('tokens')
                .eq('id', id)
                .single()

            if (fetchError) {
                console.log("Fetch Error:", fetchError)
                return res.status(500).json({error: fetchError})
            }

            const currentTokens = userData.tokens
            const newTokens = currentTokens + tokens

            const { data: upsertData, error: upsertError } = await supabase
                .from('users')
                .upsert([{ id: id, tokens: newTokens }], { onConflict: ['id'] })

            if (upsertError) {
                console.log("Upsert Error:", upsertError)
                return res.status(500).json({error: upsertError})
            }

            return res.status(200).json({data: upsertData})
        } catch (error) {
            console.log('Catch Error:', error)
            return res.status(500).json({error: "internal server error"})
        }
    }
}