import express from 'express';
const router = express.Router()

router.post('/register', async (req, res) => {
  const userData = req.body
  
  const { data, error } = await supabase.auth.signUp(
    {
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          username: userData.username,
        }
      }
    }
  )

  console.log(userData)
  res.status(201).send('amogus')

})

export default router;
