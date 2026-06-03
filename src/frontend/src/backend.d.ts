import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface NotificationPreferences {
    sms: boolean;
    push: boolean;
    criticalAlertsOnly: boolean;
    email: boolean;
}
export interface InvestmentResult {
    profitKES: number;
    projectedValueKES: number;
    roiPercent: number;
    breakEvenYears: number;
    profitPercent: number;
}
export interface MarketSummary {
    numTransactions: bigint;
    averagePrice: number;
    location: string;
}
export interface DisputeEvidence {
    id: string;
    description: string;
    fileName: string;
    fileSize: bigint;
    fileId: string;
    timestamp: bigint;
    uploadedBy: Principal;
    disputeId: string;
}
export interface AuditEntry {
    id: string;
    initiator: Principal;
    actionType: string;
    entityId: string;
    timestamp: bigint;
    details: string;
    entityType: string;
}
export interface DemandHeatMapPoint {
    demandScore: bigint;
    location: string;
    coordinates?: Coordinates;
}
export interface MarketTrendData {
    demandScore: bigint;
    priceTrend: Array<PricePoint>;
    location: string;
}
export interface MarketTrend {
    id: string;
    created: Time;
    price: number;
    location: string;
}
export interface LandApplicationView {
    id: string;
    status: ApplicationStatus;
    created: Time;
    titleNumber: string;
    owner: Principal;
    area?: bigint;
    updated: Time;
    location: string;
    attachments: Array<ExternalBlob>;
}
export interface GeneratedPropertyReport {
    content: string;
    generatedAt: bigint;
    reportId: string;
}
export interface IdentityFields {
    dateOfBirth: string;
    nationalId: string;
    ethnicity: string;
    passportNumber: string;
}
export interface PrivacyPreferences {
    allowDataCollection: boolean;
    shareLocation: boolean;
    showPublicProfile: boolean;
}
export interface PortfolioSummary {
    riskDistribution: {
        low: bigint;
        high: bigint;
        medium: bigint;
    };
    annualGrowthRate: number;
    totalEstimatedValue: number;
    properties: Array<Property>;
}
export interface DisputeView {
    id: string;
    status: DisputeStatus;
    created: Time;
    initiator: Principal;
    propertyId: string;
    updated: Time;
    comments: Array<string>;
    reason: string;
}
export interface DashboardStats {
    activeDisputes: bigint;
    recentApplications: Array<{
        id: string;
        status: string;
        created: bigint;
        titleNumber: string;
    }>;
    verifiedOwners: bigint;
    estimatedTotalLandValue: number;
    totalRegisteredTitles: bigint;
    pendingTransactions: bigint;
}
export interface ValuationInput {
    roadAccess: boolean;
    landSizeAcres: number;
    nearbyAmenities: Array<string>;
    location: string;
}
export interface ValuationResult {
    comparableProperties: Array<string>;
    growthForecastPercent: number;
    confidenceScore: number;
    estimatedValueKES: number;
    investmentPotential: string;
}
export interface SendMessageResponse {
    message: string;
    success: boolean;
}
export interface Notification {
    id: string;
    read: boolean;
    recipient: Principal;
    message: string;
    timestamp: Time;
}
export interface UserSettings {
    notifications: NotificationPreferences;
    themePreference: ThemePreference;
    privacy: PrivacyPreferences;
    motionPreference: MotionPreference;
}
export interface Conversation {
    id: string;
    participantA: Principal;
    participantB: Principal;
    lastMessageTimestamp: bigint;
    messages: Array<Message>;
}
export type Time = bigint;
export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface PropertyReport {
    id: string;
    created: Time;
    content: string;
    propertyId: string;
    author: Principal;
}
export interface InfrastructureProject {
    id: string;
    status: ProjectStatus;
    created: Time;
    name: string;
    details: string;
    location: string;
}
export interface Transaction {
    id: string;
    status: TransactionStatus;
    date: Time;
    propertyId: string;
    seller: Principal;
    buyer: Principal;
    price: number;
}
export interface Property {
    id: string;
    status: PropertyStatus;
    created: Time;
    value: number;
    titleNumber: string;
    owner: Principal;
    area: number;
    updated: Time;
    location: string;
}
export interface InfrastructureTimelineItem {
    id: string;
    region: string;
    status: string;
    endDate?: bigint;
    name: string;
    type: string;
    description: string;
    impactRadius: number;
    startDate: bigint;
}
export interface MarketAnalytics {
    pricesByRegion: Array<[string, number]>;
    activeListings: bigint;
    appreciationRates: Array<[string, number]>;
    topRegions: Array<string>;
}
export interface BudgetRange {
    minBudget: number;
    maxBudget: number;
}
export interface PricePoint {
    timestamp: Time;
    price: number;
}
export interface SavedProperty {
    id: string;
    userId: Principal;
    propertyId: string;
    savedAt: Time;
}
export interface VerifiedUserProfile {
    accountStatus: AccountStatus;
    emailVerified: boolean;
    name: string;
    role: DomainRole;
    riskType: RiskType;
    identityFields?: IdentityFields;
    idDocument?: ExternalBlob;
    photo?: ExternalBlob;
    phoneVerified: boolean;
}
export interface RiskSummary {
    fraudAlertCount: bigint;
    highRiskProperties: Array<string>;
    recentDisputes: Array<DisputeView>;
    riskScore: number;
}
export interface VerificationRecord {
    status: VerificationStatus;
    officerId: Principal;
    notes: string;
    timestamp: bigint;
}
export interface ConversationSummary {
    id: string;
    participantA: Principal;
    participantB: Principal;
    lastMessageTimestamp: bigint;
    unreadMessagesCount: bigint;
}
export interface Preferences {
    notifyInfrastructureUpdates: boolean;
    riskTolerance: RiskType;
    notifyNewListings: boolean;
    notifyPriceDrops: boolean;
    aiPersonalization: {
        growthExpectation: bigint;
        preferredLandType: string;
        riskAppetite: RiskType;
        investmentGoals: Array<string>;
        budgetRange: BudgetRange;
    };
    notifyMarketTrends: boolean;
    notifyDisputes: boolean;
    preferredRegions: Array<string>;
}
export interface NotificationFeedItem {
    id: string;
    title: string;
    body: string;
    link?: string;
    read: boolean;
    type: string;
    timestamp: bigint;
}
export interface DisputeTimelineEvent {
    id: string;
    initiator: Principal;
    description: string;
    timestamp: bigint;
    eventType: string;
    disputeId: string;
    evidenceIds: Array<string>;
}
export interface InvestmentInput {
    investmentYears: bigint;
    buyingPriceKES: number;
    annualGrowthRatePercent: number;
}
export interface Valuation {
    id: string;
    status: ValuationStatus;
    created: Time;
    value: number;
    date: Time;
    valuer: Principal;
    propertyId: string;
}
export interface Message {
    id: string;
    content: string;
    read: boolean;
    sender: Principal;
    timestamp: bigint;
    receiver: Principal;
}
export interface TransactionStageEntry {
    initiator: Principal;
    stage: TransactionStage;
    notes: string;
    timestamp: bigint;
}
export enum AccountStatus {
    pendingVerification = "pendingVerification",
    closed = "closed",
    active = "active",
    suspended = "suspended"
}
export enum ApplicationStatus {
    cancelled = "cancelled",
    submitted = "submitted",
    underReview = "underReview",
    approved = "approved",
    rejected = "rejected",
    draft = "draft"
}
export enum DisputeStatus {
    resolved = "resolved",
    underReview = "underReview",
    open = "open"
}
export enum DomainRole {
    admin = "admin",
    citizen = "citizen",
    landOfficer = "landOfficer"
}
export enum MotionPreference {
    advanced = "advanced",
    default_ = "default",
    reduced = "reduced"
}
export enum ProjectStatus {
    completed = "completed",
    planned = "planned",
    ongoing = "ongoing"
}
export enum PropertyStatus {
    active = "active",
    disputed = "disputed",
    pending = "pending",
    sold = "sold"
}
export enum RiskType {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum ThemePreference {
    dark = "dark",
    futuristic = "futuristic",
    light = "light"
}
export enum TransactionStage {
    cancelled = "cancelled",
    completed = "completed",
    recorded = "recorded",
    stampDuty = "stampDuty",
    proposed = "proposed",
    escrow = "escrow"
}
export enum TransactionStatus {
    disputed = "disputed",
    initiated = "initiated",
    completed = "completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum ValuationStatus {
    disputed = "disputed",
    pending = "pending",
    approved = "approved"
}
export enum VerificationStatus {
    pendingReview = "pendingReview",
    verified = "verified",
    unverified = "unverified",
    rejected = "rejected"
}
export interface backendInterface {
    addDisputeEvidence(disputeId: string, fileId: string, fileName: string, fileSize: bigint, description: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    advanceTransactionStage(transactionId: string, notes: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    approveApplication(appId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateInvestment(input: InvestmentInput): Promise<InvestmentResult>;
    calculateValuation(input: ValuationInput): Promise<{
        __kind__: "ok";
        ok: ValuationResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelApplication(appId: string): Promise<void>;
    checkApplicationStatus(userId: Principal): Promise<Array<LandApplicationView>>;
    clearCallerPreferences(): Promise<void>;
    clearSearchCounts(): Promise<void>;
    clearUserSettings(): Promise<void>;
    createApplication(titleNumber: string, area: bigint | null, location: string): Promise<string>;
    createDispute(disputeView: DisputeView): Promise<void>;
    createInfrastructureProject(project: InfrastructureProject): Promise<void>;
    createMarketTrend(trend: MarketTrend): Promise<void>;
    createNotification(notification: Notification): Promise<void>;
    createProperty(property: Property): Promise<void>;
    createPropertyReport(report: PropertyReport): Promise<void>;
    createSavedProperty(savedProperty: SavedProperty): Promise<void>;
    createTransaction(transaction: Transaction): Promise<void>;
    createValuation(valuation: Valuation): Promise<void>;
    deleteConversation(conversationId: string): Promise<void>;
    deleteDispute(id: string): Promise<void>;
    deleteInfrastructureProject(id: string): Promise<void>;
    deleteMarketTrend(id: string): Promise<void>;
    deleteNotification(id: string): Promise<void>;
    deleteProperty(id: string): Promise<void>;
    deletePropertyReport(id: string): Promise<void>;
    deleteSavedProperty(id: string): Promise<void>;
    deleteTransaction(id: string): Promise<void>;
    deleteValuation(id: string): Promise<void>;
    exportAuditCsv(entityId: string | null): Promise<string>;
    generatePropertyReport(propertyId: string): Promise<{
        __kind__: "ok";
        ok: GeneratedPropertyReport;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllCoordinates(): Promise<Array<[string, Coordinates]>>;
    getAllMarketTrends(): Promise<Array<MarketTrendData>>;
    getApplicationStatus(appId: string): Promise<ApplicationStatus>;
    getApplications(owners: Array<Principal>): Promise<Array<LandApplicationView>>;
    getApplicationsByStatusInternal(status: ApplicationStatus): Promise<Array<LandApplicationView>>;
    getAuditLog(entityId: string | null, actionType: string | null, limit: bigint): Promise<Array<AuditEntry>>;
    getCallerPreferences(): Promise<Preferences>;
    getCallerUserProfile(): Promise<VerifiedUserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallerUserSettings(): Promise<UserSettings>;
    getConversation(partner: Principal): Promise<Conversation | null>;
    getConversationMessages(partner: Principal): Promise<Array<Message>>;
    getConversations(): Promise<Array<ConversationSummary>>;
    getDashboardStats(): Promise<DashboardStats>;
    getDemandHeatMapPoints(): Promise<Array<DemandHeatMapPoint>>;
    getDemandScore(location: string): Promise<bigint>;
    getDispute(id: string): Promise<DisputeView | null>;
    getDisputeEvidence(disputeId: string): Promise<{
        __kind__: "ok";
        ok: Array<DisputeEvidence>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDisputeTimeline(disputeId: string): Promise<{
        __kind__: "ok";
        ok: Array<DisputeTimelineEvent>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getInfrastructureProject(id: string): Promise<InfrastructureProject | null>;
    getInfrastructureTimeline(region: string | null): Promise<Array<InfrastructureTimelineItem>>;
    getInvestmentPortfolioSummary(): Promise<PortfolioSummary>;
    getLocationCoordinates(location: string): Promise<Coordinates | null>;
    getMarketAnalytics(region: string | null): Promise<MarketAnalytics>;
    getMarketSummary(location: string): Promise<MarketSummary | null>;
    getMarketTrend(id: string): Promise<MarketTrend | null>;
    getMarketplaceListings(verified: boolean | null, minPrice: number | null, maxPrice: number | null): Promise<Array<Property>>;
    getNotification(id: string): Promise<Notification | null>;
    getNotificationFeed(limit: bigint): Promise<Array<NotificationFeedItem>>;
    getPriceTrend(location: string): Promise<Array<PricePoint>>;
    getProperty(id: string): Promise<Property | null>;
    getPropertyReport(id: string): Promise<PropertyReport | null>;
    getRiskIntelligenceSummary(region: string | null): Promise<RiskSummary>;
    getSavedProperty(id: string): Promise<SavedProperty | null>;
    getTitleVerificationHistory(propertyId: string): Promise<{
        __kind__: "ok";
        ok: Array<VerificationRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getTopSearches(limit: bigint): Promise<Array<[string, bigint]>>;
    getTransaction(id: string): Promise<Transaction | null>;
    getTransactionStageHistory(transactionId: string): Promise<{
        __kind__: "ok";
        ok: Array<TransactionStageEntry>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUserConversations(userId: Principal): Promise<Array<ConversationSummary>>;
    getUserPreferences(_userId: Principal): Promise<Preferences>;
    getUserProfile(user: Principal): Promise<VerifiedUserProfile | null>;
    getUserSettings(userId: Principal): Promise<UserSettings>;
    getValuation(id: string): Promise<Valuation | null>;
    isCallerAdmin(): Promise<boolean>;
    listDisputes(): Promise<Array<DisputeView>>;
    listInfrastructureProjects(): Promise<Array<InfrastructureProject>>;
    listMarketTrends(): Promise<Array<MarketTrend>>;
    listNotifications(): Promise<Array<Notification>>;
    listProperties(): Promise<Array<Property>>;
    listPropertyReports(): Promise<Array<PropertyReport>>;
    listSavedProperties(): Promise<Array<SavedProperty>>;
    listTransactions(): Promise<Array<Transaction>>;
    listValuations(): Promise<Array<Valuation>>;
    markAllMessagesAsRead(conversationId: string): Promise<void>;
    markNotificationRead(id: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    officerVerifyTitle(propertyId: string, status: VerificationStatus, notes: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    recordSearch(location: string): Promise<void>;
    rejectApplication(appId: string, _reason: string): Promise<void>;
    saveCallerUserProfile(profile: VerifiedUserProfile): Promise<void>;
    searchApplicationByTitleNumber(titleNumber: string): Promise<Array<LandApplicationView>>;
    searchApplicationsByLocation(location: string): Promise<Array<LandApplicationView>>;
    searchApplicationsByTitleNumber(titleNumber: string): Promise<Array<LandApplicationView>>;
    searchUsers(searchTerm: string): Promise<Array<[Principal, VerifiedUserProfile]>>;
    sendMessage(receiver: Principal, content: string): Promise<SendMessageResponse>;
    setCallerPreferences(prefs: Preferences): Promise<void>;
    setDemandScore(location: string, score: bigint): Promise<void>;
    setLocationCoordinates(location: string, latitude: number, longitude: number): Promise<void>;
    setMarketSummary(location: string, summary: MarketSummary): Promise<void>;
    setPriceTrend(location: string, points: Array<PricePoint>): Promise<void>;
    submitApplication(appId: string): Promise<void>;
    submitForVerification(propertyId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCallerUserSettings(settings: UserSettings): Promise<UserSettings>;
    updateDispute(disputeView: DisputeView): Promise<void>;
    updateInfrastructureProject(project: InfrastructureProject): Promise<void>;
    updateMarketTrend(trend: MarketTrend): Promise<void>;
    updateNotification(notification: Notification): Promise<void>;
    updateProperty(property: Property): Promise<void>;
    updatePropertyReport(report: PropertyReport): Promise<void>;
    updateSavedProperty(savedProperty: SavedProperty): Promise<void>;
    updateTransaction(transaction: Transaction): Promise<void>;
    updateValuation(valuation: Valuation): Promise<void>;
    uploadAttachment(appId: string, externalBlob: ExternalBlob): Promise<void>;
}
