import _ from "lodash";
import withHttps from "../../utils/StringUtils/withHttps";

/**
 * @type {{owner: string, githubURL: string, address: string, mediumURL: string, whitepaperURL: string, twitterURL: string, isInitialized: string, kyced: string, bannerURL: string, telegramURL: string, saleToken: string, audited: string, raisedToken: string, redditURL: string, canceled: string, facebookURL: string, discordURL: string, websiteURL: string, youtubeURL: string, startTime: string, id: string, endTime: string, iconURL: string}}
 */
const keys = {
  id: "id",
  name: "name",
  description: "description",
  chariaa: "chariaa",
  address: "address",
  raisedToken: "raisedToken",
  saleToken: "saleToken",
  owner: "owner",
  isInitialized: "isInitiated",
  kyced: "kyced",
  audited: "audited",
  startTime: "startTime",
  endTime: "endTime",
  canceled: "canceled",
  bannerURL: "bannerURL",
  iconURL: "iconURL",
  discordURL: "discordURL",
  telegramURL: "telegramURL",
  twitterURL: "twitterURL",
  websiteURL: "websiteURL",
  whitepaperURL: "whitepaperURL",
  youtubeURL: "youtubeURL",
  facebookURL: "facebookURL",
  mediumURL: "mediumURL",
  githubURL: "githubURL",
  redditURL: "redditURL",
  isHidden: "isHidden",
  audtitReportURL: "audtitReportURL",
};

class PresaleClass {
  constructor(obj) {
    this.original = { ...obj };
    this.obj = obj;
  }

  getOnlyChanged() {
    const changes = _.differenceWith(
      _.toPairs(this.obj),
      _.toPairs(this.original),
      _.isEqual
    );
    return _.fromPairs(changes);
  }

  getAuditReportURL() {
    return this.obj[keys.audtitReportURL];
  }

  setAuditReportURL(auditReportURL) {
    auditReportURL = withHttps(auditReportURL);
    this.obj[keys.audtitReportURL] = auditReportURL;
  }

  getIsHidden() {
    return this.obj[keys.isHidden];
  }

  setIsHidden(isHidden) {
    this.obj[keys.isHidden] = isHidden;
  }

  getChariaa() {
    return this.obj[keys.chariaa];
  }

  setChariaa(chariaa) {
    this.obj[keys.chariaa] = chariaa.toLowerCase();
  }

  getName() {
    return this.obj[keys.name];
  }

  setName(name) {
    this.obj[keys.name] = name;
  }

  setDescription(description) {
    this.obj[keys.description] = description;
  }

  getDescription() {
    return this.obj[keys.description];
  }

  getId() {
    return this.obj[keys.id];
  }

  getAddress() {
    return this.obj[keys.address];
  }

  setAddress(address) {
    address = address.toLowerCase();
    this.obj[keys.address] = address;
  }

  getRaisedToken() {
    return this.obj[keys.raisedToken];
  }

  setRaisedToken(raisedToken) {
    raisedToken = raisedToken.toLowerCase();
    this.obj[keys.raisedToken] = raisedToken;
  }

  getSaleToken() {
    return this.obj[keys.saleToken];
  }

  setSaleToken(saleToken) {
    saleToken = saleToken.toLowerCase();
    this.obj[keys.saleToken] = saleToken;
  }

  getOwner() {
    return this.obj[keys.owner];
  }

  setOwner(owner) {
    owner = owner.toLowerCase();
    this.obj[keys.owner] = owner;
  }

  getIsInitialized() {
    return this.obj[keys.isInitialized];
  }

  setIsInitialized(isInitialized) {
    this.obj[keys.isInitialized] = isInitialized;
  }

  getKyced() {
    return this.obj[keys.kyced];
  }

  setKyced(kyced) {
    this.obj[keys.kyced] = kyced;
  }

  getAudited() {
    return this.obj[keys.audited];
  }

  setAudited(audited) {
    this.obj[keys.audited] = audited;
  }

  getStartTime() {
    return this.obj[keys.startTime];
  }

  setStartTime(startTime) {
    this.obj[keys.startTime] = startTime;
  }

  getEndTime() {
    return this.obj[keys.endTime];
  }

  setEndTime(endTime) {
    this.obj[keys.endTime] = endTime;
  }

  getCanceled() {
    return this.obj[keys.canceled];
  }

  setCanceled(canceled) {
    this.obj[keys.canceled] = canceled;
  }

  getBannerURL() {
    return this.obj[keys.bannerURL];
  }

  setBannerURL(bannerURL) {
    bannerURL = withHttps(bannerURL);
    this.obj[keys.bannerURL] = bannerURL;
  }

  getIconURL() {
    return this.obj[keys.iconURL];
  }

  setIconURL(iconURL) {
    iconURL = withHttps(iconURL);
    this.obj[keys.iconURL] = iconURL;
  }

  getDiscordURL() {
    return this.obj[keys.discordURL];
  }

  setDiscordURL(discordURL) {
    discordURL = withHttps(discordURL);
    this.obj[keys.discordURL] = discordURL;
  }

  getTelegramURL() {
    return this.obj[keys.telegramURL];
  }

  setTelegramURL(telegramURL) {
    telegramURL = withHttps(telegramURL);
    this.obj[keys.telegramURL] = telegramURL;
  }

  getTwitterURL() {
    return this.obj[keys.twitterURL];
  }

  setTwitterURL(twitterURL) {
    twitterURL = withHttps(twitterURL);
    this.obj[keys.twitterURL] = twitterURL;
  }

  getWebsiteURL() {
    return this.obj[keys.websiteURL];
  }

  setWebsiteURL(websiteURL) {
    websiteURL = withHttps(websiteURL);
    this.obj[keys.websiteURL] = websiteURL;
  }

  getWhitepaperURL() {
    return this.obj[keys.whitepaperURL];
  }

  setWhitepaperURL(whitepaperURL) {
    whitepaperURL = withHttps(whitepaperURL);
    this.obj[keys.whitepaperURL] = whitepaperURL;
  }

  getYoutubeURL() {
    return this.obj[keys.youtubeURL];
  }

  setYoutubeURL(youtubeURL) {
    youtubeURL = withHttps(youtubeURL);
    this.obj[keys.youtubeURL] = youtubeURL;
  }

  getFacebookURL() {
    return this.obj[keys.facebookURL];
  }

  setFacebookURL(facebookURL) {
    this.obj[keys.facebookURL] = facebookURL;
  }

  getMediumURL() {
    return this.obj[keys.mediumURL];
  }

  setMediumURL(mediumURL) {
    this.obj[keys.mediumURL] = mediumURL;
  }

  getGithubURL() {
    return this.obj[keys.githubURL];
  }

  setGithubURL(githubURL) {
    githubURL = withHttps(githubURL);
    this.obj[keys.githubURL] = githubURL;
  }

  getRedditURL() {
    return this.obj[keys.redditURL];
  }

  setRedditURL(redditURL) {
    redditURL = withHttps(redditURL);
    this.obj[keys.redditURL] = redditURL;
  }

  getOriginal() {
    return this.original;
  }

  getObj() {
    return this.obj;
  }
}

export default PresaleClass;
