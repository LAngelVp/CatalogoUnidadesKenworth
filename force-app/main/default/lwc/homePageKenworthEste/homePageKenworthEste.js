import { LightningElement } from 'lwc';
import IMAGE_HERO from '@salesforce/resourceUrl/PageOficial_imageHero1';
import IMAGE_PATRIMONIO from '@salesforce/resourceUrl/PageOficial_imagePatrimonio';
import IMAGE_PATRIMONIODAF from '@salesforce/resourceUrl/PageOficial_imagePatrimonioDAF';
import IMAGE_NEXTGEN from '@salesforce/resourceUrl/PageOficial_imageNextGen1';
import IMAGE_TABLERONEXTGEN from '@salesforce/resourceUrl/PageOficial_imageInteriorNextGen1';
import IMAGE_MOTORMX13 from '@salesforce/resourceUrl/PageOficial_imageMotorPaccarMX13';
import IMAGE_DORMITORIONEXTGEN from '@salesforce/resourceUrl/PageOficial_imageDormitorioNextGen';
import IMAGE_INTERIORDAF from '@salesforce/resourceUrl/PageOficial_imageInteriorDaf';
import IMAGE_DORMITORIODAF from '@salesforce/resourceUrl/PageOficial_imageDormitorioDaf';
import IMAGE_MODELOSDAF from '@salesforce/resourceUrl/PageOficial_imageModelosDaf';

import IMAGE_REDTOTAL from '@salesforce/resourceUrl/PageOficial_RedTotal';
import IMAGE_ISO14001 from '@salesforce/resourceUrl/PageOficial_iso14001';
import IMAGE_ISO9001 from '@salesforce/resourceUrl/PageOficial_iso9001';
import IMAGE_EPA from '@salesforce/resourceUrl/PageOficial_EPACertificate';
export default class HomePageKenworthEste extends LightningElement {
    imgHero = IMAGE_HERO;
    img1923 = IMAGE_PATRIMONIO;
    img1928 = IMAGE_PATRIMONIODAF;
    imgTableroNextGen = IMAGE_TABLERONEXTGEN;
    imgNextGen = IMAGE_NEXTGEN;
    imgMotorMX13 = IMAGE_MOTORMX13;
    imgDormitorioNextGen = IMAGE_DORMITORIONEXTGEN;

    imgInteriorDaf = IMAGE_INTERIORDAF;
    imgDormitorioDaf = IMAGE_DORMITORIODAF;
    imgModelosDaf = IMAGE_MODELOSDAF;

    // certificaciones
    imgRedTotal = IMAGE_REDTOTAL;
    imgIso14001 = IMAGE_ISO14001;
    imgIso9001 = IMAGE_ISO9001;
    imgEPA = IMAGE_EPA;
}