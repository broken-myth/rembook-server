const getForgotPassHTML = (Password: string) => {
	const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" type="text/css">
                <title>Rembook</title>
            </head>
            </head>
            <body style="background-color: #e9ecef; font-family: Montserrat !important;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://delta.nitt.edu">
                                    <img src="https://delta.nitt.edu/images/deltaLogoGreen.png" style="height:100px;width:100px">
                                </a>
                                </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; border-top: 3px solid #d4dadf;">
                                <h1 style="margin: 0; font-size: 25px; font-weight: 600; letter-spacing: -1px; line-height: 48px;">Hey
                                    <span> there! </span></h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px;  font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">
                                Use this otp for resetting you password - ${Password}
                                </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" bgcolor="#3bc20d">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td bgcolor="#3bc20d" style="padding: 0px;" align="center">
                                            <table border="0" cellpadding="0" cellspacing="5" style="margin-top: 20px; margin-bottom: 15px;">
                                            <tr style="border-bottom: 15px">
                                                <td align="center">
                                                    <a href="https://www.facebook.com/delta.nit.trichy/">
                                                        <img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_128x128.png" style="height:30px;width:30px">
                                                    </a>
                                                </td>
                                                <td align="center">
                                                    <a href="https://www.instagram.com/delta_nitt/">
                                                        <img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_128x128.png" style="height:30px;width:30px">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr class="spacer"></tr>
                                            <tr class="spacer"></tr>
                                            <tr>
                                                <td align="center" colspan=2 style="font-size: 13px; color: rgba(18,18,18,0.8); font-weight: 500">Made with ❤️ by Delta Force</td>
                                            </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>
                    <td align='center' bgcolor='#e9ecef' style='padding: 24px;'>
                        <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px;'>
                            <tr>
                                <td align='center' bgcolor='#e9ecef' style='padding: 12px 24px;  font-size: 14px; line-height: 20px; color: #666;'>
                                <p style='margin: 0;'>You received this email because we received a request from your rembook account. If you didn't you can safely delete this email.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    </tr>
                </table>
            </body>
        </html>
        `;

	return html;
};

const getResetAuthHTML = (link: string, code: string) => {
	const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" type="text/css">
                <title>Rembook</title>
            </head>
            </head>
            <body style="background-color: #e9ecef; font-family: Montserrat !important;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://delta.nitt.edu">
                                    <img src="https://delta.nitt.edu/images/deltaLogoGreen.png" style="height:100px;width:100px">
                                </a>
                                </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; border-top: 3px solid #d4dadf;">
                                <h1 style="margin: 0; font-size: 25px; font-weight: 600; letter-spacing: -1px; line-height: 48px;">Hey
                                    <span> there! </span></h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px;  font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">
                                You have requested to reset your Rembook password. Please use the following link to reset your password.
                                </p>
                                <p style="margin: 0;">
                                Use this code for verification - ${code}
                                </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" bgcolor="#ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                    <a href=${link} target="_blank" style="display: inline-block; padding: 16px 36px;  font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                        Reset
                                                    </a>
                                                </td>
                                            </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" bgcolor="#3bc20d">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td bgcolor="#3bc20d" style="padding: 0px;" align="center">
                                            <table border="0" cellpadding="0" cellspacing="5" style="margin-top: 20px; margin-bottom: 15px;">
                                            <tr style="border-bottom: 15px">
                                                <td align="center">
                                                    <a href="https://www.facebook.com/delta.nit.trichy/">
                                                        <img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_128x128.png" style="height:30px;width:30px">
                                                    </a>
                                                </td>
                                                <td align="center">
                                                    <a href="https://www.instagram.com/delta_nitt/">
                                                        <img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_128x128.png" style="height:30px;width:30px">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr class="spacer"></tr>
                                            <tr class="spacer"></tr>
                                            <tr>
                                                <td align="center" colspan=2 style="font-size: 13px; color: rgba(18,18,18,0.8); font-weight: 500">Made with ❤️ by Delta Force</td>
                                            </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>
                    <td align='center' bgcolor='#e9ecef' style='padding: 24px;'>
                        <table border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 600px;'>
                            <tr>
                                <td align='center' bgcolor='#e9ecef' style='padding: 12px 24px;  font-size: 14px; line-height: 20px; color: #666;'>
                                <p style='margin: 0;'>You received this email because we received a request from your rembook account. If you didn't you can safely delete this email.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    </tr>
                </table>
            </body>
        </html>
        `;

	return html;
};

export { getResetAuthHTML, getForgotPassHTML };
