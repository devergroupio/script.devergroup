import translateAPI from "google-translate-api";
import qs from "querystring";
import { CONFIG } from "~@/core/utils";
// class translateAPIService {
//   detectLanguge(text) {
//     return new Promise(resolve => {
//       translateAPI(text, { to: 'en' }).then(response => {
//         resolve(response);
//       });
//     });
//   }

//   async isEnglish(description) {
//     const language = await this.detectLanguge(description);
//     const languageString = language.from.language.iso;
//     if (languageString === 'es' || languageString === 'en') {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   async translateAPI(word) {
//     return new Promise(resolve => {
//       translateAPI(word, { to: 'vi' })
//         .then(res => {
//           resolve(res.text);
//         })
//         .catch(err => {
//           resolve(err.toString());
//         });
//     });
//   }
// }
// let translateAPIService = new translateAPIService();
// module.exports = translateAPIService;
import axios from "axios";
export const detectLang = async (text: string) => {
    try {
        const {
            data: { message, status }
        } = await axios.post<{
            status: string;
            message: string;
        }>(
            `${CONFIG.FREELANCER_AI_ENDPOINT}/detect`,
            qs.stringify({
                text
            })
        );
        console.log("freelancer_ai_lib: ", message, status);
        if (status === "error") {
            throw new Error(message);
        }
        return message;
    } catch (err) {
        throw new Error(err);
    }
};

export const translate = async (text: string) => {
    const { text: resultText } = await translateAPI(text, { to: "vi" }); // @TODO: handling Error
    console.log("translated", resultText);
    return resultText;
};
