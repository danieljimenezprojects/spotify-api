import { useEffect, useState } from "react"
import { BASE_URL } from "../constants/spotify-constants"
import getUser from "../services/getUser"

function useUserId(effectiveToken) {
	const [userId, setUserId] = useState('')

	useEffect(() => {
    getUser(effectiveToken, setUserId)
	}, [effectiveToken])

  return { userId}
}

export default useUserId
