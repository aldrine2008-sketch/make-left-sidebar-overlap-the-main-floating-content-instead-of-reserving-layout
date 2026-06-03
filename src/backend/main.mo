import Set "mo:core/Set";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import List "mo:core/List";
import Bool "mo:core/Bool";
import Debug "mo:core/Debug";

import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Int "mo:core/Int";

actor {
  include MixinObjectStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type LandApplication = {
    id : Text;
    titleNumber : Text;
    status : ApplicationStatus;
    area : ?Nat;
    location : Text;
    attachments : Set.Set<Storage.ExternalBlob>;
    created : Time.Time;
    updated : Time.Time;
    owner : Principal;
  };

  public type LandApplicationView = {
    id : Text;
    titleNumber : Text;
    status : ApplicationStatus;
    area : ?Nat;
    location : Text;
    attachments : [Storage.ExternalBlob];
    created : Time.Time;
    updated : Time.Time;
    owner : Principal;
  };

  public type ApplicationStatus = {
    #draft;
    #submitted;
    #underReview;
    #approved;
    #rejected;
    #cancelled;
  };

  public type VerifiedUserProfile = {
    name : Text;
    role : DomainRole;
    photo : ?Storage.ExternalBlob;
    emailVerified : Bool;
    phoneVerified : Bool;
    idDocument : ?Storage.ExternalBlob;
    accountStatus : AccountStatus;
    identityFields : ?IdentityFields;
    riskType : RiskType;
  };

  public type IdentityFields = {
    nationalId : Text;
    passportNumber : Text;
    dateOfBirth : Text;
    ethnicity : Text;
  };

  public type AccountStatus = {
    #active;
    #pendingVerification;
    #suspended;
    #closed;
  };

  public type DomainRole = {
    #citizen;
    #landOfficer;
    #admin;
  };

  public type MarketSummary = {
    location : Text;
    averagePrice : Float;
    numTransactions : Nat;
  };

  public type PricePoint = {
    timestamp : Time.Time;
    price : Float;
  };

  public type MarketTrendData = {
    location : Text;
    priceTrend : [PricePoint];
    demandScore : Nat;
  };

  public type Coordinates = {
    latitude : Float;
    longitude : Float;
  };

  public type DemandHeatMapPoint = {
    location : Text;
    demandScore : Nat;
    coordinates : ?Coordinates;
  };

  public type Property = {
    id : Text;
    titleNumber : Text;
    owner : Principal;
    area : Float;
    location : Text;
    value : Float;
    status : PropertyStatus;
    created : Time.Time;
    updated : Time.Time;
  };

  public type PropertyStatus = {
    #active;
    #pending;
    #disputed;
    #sold;
  };

  public type Valuation = {
    id : Text;
    propertyId : Text;
    valuer : Principal;
    value : Float;
    date : Time.Time;
    status : ValuationStatus;
    created : Time.Time;
  };

  public type ValuationStatus = {
    #pending;
    #approved;
    #disputed;
  };

  public type Dispute = {
    id : Text;
    propertyId : Text;
    initiator : Principal;
    reason : Text;
    status : DisputeStatus;
    created : Time.Time;
    updated : Time.Time;
    comments : List.List<Text>;
  };

  public type DisputeView = {
    id : Text;
    propertyId : Text;
    initiator : Principal;
    reason : Text;
    status : DisputeStatus;
    created : Time.Time;
    updated : Time.Time;
    comments : [Text];
  };

  public type DisputeStatus = { #open; #underReview; #resolved };

  public type MarketTrend = {
    id : Text;
    location : Text;
    price : Float;
    created : Time.Time;
  };

  public type PropertyReport = {
    id : Text;
    propertyId : Text;
    author : Principal;
    content : Text;
    created : Time.Time;
  };

  public type Notification = {
    id : Text;
    recipient : Principal;
    message : Text;
    timestamp : Time.Time;
    read : Bool;
  };

  public type InfrastructureProject = {
    id : Text;
    name : Text;
    location : Text;
    status : ProjectStatus;
    details : Text;
    created : Time.Time;
  };

  public type ProjectStatus = {
    #planned;
    #ongoing;
    #completed;
  };

  public type Transaction = {
    id : Text;
    propertyId : Text;
    buyer : Principal;
    seller : Principal;
    price : Float;
    date : Time.Time;
    status : TransactionStatus;
  };

  public type TransactionStatus = {
    #initiated;
    #completed;
    #disputed;
  };

  public type SavedProperty = {
    id : Text;
    userId : Principal;
    propertyId : Text;
    savedAt : Time.Time;
  };

  public type UserSettings = {
    themePreference : ThemePreference;
    motionPreference : MotionPreference;
    notifications : NotificationPreferences;
    privacy : PrivacyPreferences;
  };

  public type ThemePreference = {
    #light;
    #dark;
    #futuristic;
  };

  public type MotionPreference = {
    #default;
    #reduced;
    #advanced;
  };

  public type NotificationPreferences = {
    email : Bool;
    push : Bool;
    sms : Bool;
    criticalAlertsOnly : Bool;
  };

  public type Preferences = {
    notifyPriceDrops : Bool;
    notifyDisputes : Bool;
    notifyNewListings : Bool;
    notifyInfrastructureUpdates : Bool;
    notifyMarketTrends : Bool;
    preferredRegions : [Text];
    riskTolerance : RiskType;
    aiPersonalization : {
      investmentGoals : [Text];
      riskAppetite : RiskType;
      preferredLandType : Text;
      budgetRange : BudgetRange;
      growthExpectation : Nat;
    };
  };

  public type BudgetRange = {
    minBudget : Float;
    maxBudget : Float;
  };

  public type RiskType = {
    #low;
    #medium;
    #high;
  };

  public type PrivacyPreferences = {
    shareLocation : Bool;
    allowDataCollection : Bool;
    showPublicProfile : Bool;
  };

  public type Message = {
    id : Text;
    sender : Principal;
    receiver : Principal;
    content : Text;
    timestamp : Int;
    read : Bool;
  };

  public type Conversation = {
    id : Text;
    participantA : Principal;
    participantB : Principal;
    messages : [Message];
    lastMessageTimestamp : Int;
  };

  public type ConversationSummary = {
    id : Text;
    participantA : Principal;
    participantB : Principal;
    lastMessageTimestamp : Int;
    unreadMessagesCount : Nat;
  };

  public type SendMessageResponse = {
    success : Bool;
    message : Text;
  };

  // --- Title Deed Verification ---
  public type VerificationStatus = {
    #unverified; #pendingReview; #verified; #rejected
  };
  public type VerificationRecord = {
    officerId : Principal; timestamp : Int; status : VerificationStatus; notes : Text
  };

  // --- Transaction Stages ---
  public type TransactionStage = {
    #proposed; #escrow; #stampDuty; #recorded; #completed; #cancelled
  };
  public type TransactionStageEntry = {
    stage : TransactionStage; initiator : Principal; timestamp : Int; notes : Text
  };

  // --- Dispute Evidence & Timeline ---
  public type DisputeEvidence = {
    id : Text; disputeId : Text; fileId : Text; fileName : Text; fileSize : Nat;
    uploadedBy : Principal; timestamp : Int; description : Text
  };
  public type DisputeTimelineEvent = {
    id : Text; disputeId : Text; eventType : Text; description : Text;
    initiator : Principal; timestamp : Int; evidenceIds : [Text]
  };

  // --- Audit Trail ---
  public type AuditEntry = {
    id : Text; initiator : Principal; actionType : Text; entityType : Text;
    entityId : Text; timestamp : Int; details : Text
  };

  // --- Valuation Calculator ---
  public type ValuationInput = {
    location : Text; landSizeAcres : Float; roadAccess : Bool; nearbyAmenities : [Text]
  };
  public type ValuationResult = {
    estimatedValueKES : Float; investmentPotential : Text; growthForecastPercent : Float;
    confidenceScore : Float; comparableProperties : [Text]
  };

  // --- Investment Calculator ---
  public type InvestmentInput = {
    buyingPriceKES : Float; annualGrowthRatePercent : Float; investmentYears : Nat
  };
  public type InvestmentResult = {
    projectedValueKES : Float; profitKES : Float; profitPercent : Float;
    roiPercent : Float; breakEvenYears : Float
  };

  // --- Dashboard Stats ---
  public type DashboardStats = {
    totalRegisteredTitles : Nat; verifiedOwners : Nat; pendingTransactions : Nat;
    activeDisputes : Nat; estimatedTotalLandValue : Float;
    recentApplications : [{ id : Text; titleNumber : Text; status : Text; created : Int }]
  };

  // --- Market Analytics ---
  public type MarketAnalytics = {
    pricesByRegion : [(Text, Float)]; appreciationRates : [(Text, Float)];
    activeListings : Nat; topRegions : [Text]
  };

  // --- Risk Intelligence ---
  public type RiskSummary = {
    recentDisputes : [DisputeView]; fraudAlertCount : Nat;
    highRiskProperties : [Text]; riskScore : Float
  };

  // --- Property Report (extended) ---
  // Note: PropertyReport already defined above; we add a new alias for report generation response
  public type GeneratedPropertyReport = {
    reportId : Text; content : Text; generatedAt : Int
  };

  // --- Infrastructure Timeline Item ---
  public type InfrastructureTimelineItem = {
    id : Text; name : Text; type_ : Text; region : Text; status : Text;
    startDate : Int; endDate : ?Int; impactRadius : Float; description : Text
  };

  // --- Notification Feed Item ---
  public type NotificationFeedItem = {
    id : Text; type_ : Text; title : Text; body : Text;
    timestamp : Int; read : Bool; link : ?Text
  };

  // --- Investment Portfolio Summary ---
  public type PortfolioSummary = {
    properties : [Property]; totalEstimatedValue : Float;
    annualGrowthRate : Float;
    riskDistribution : { low : Nat; medium : Nat; high : Nat }
  };

  var currentId = 0;
  let applications = Map.empty<Text, LandApplication>();
  let userProfiles = Map.empty<Principal, VerifiedUserProfile>();
  let userPreferences = Map.empty<Principal, Preferences>();
  let userSettings = Map.empty<Principal, UserSettings>();

  let marketSummaries = Map.empty<Text, MarketSummary>();
  let marketTrends = Map.empty<Text, [PricePoint]>();
  let demandScores = Map.empty<Text, Nat>();
  let searchCounts = Map.empty<Text, Nat>();
  let locationCoordinates = Map.empty<Text, Coordinates>();

  let properties = Map.empty<Text, Property>();
  let valuations = Map.empty<Text, Valuation>();
  let disputes = Map.empty<Text, Dispute>();
  let marketTrendsMap = Map.empty<Text, MarketTrend>();
  let propertyReports = Map.empty<Text, PropertyReport>();
  let notifications = Map.empty<Text, Notification>();
  let infrastructureProjects = Map.empty<Text, InfrastructureProject>();
  let transactions = Map.empty<Text, Transaction>();
  let savedProperties = Map.empty<Text, SavedProperty>();
  let conversations = Map.empty<Text, Conversation>();
  let disputeEvidence = Map.empty<Text, DisputeEvidence>();
  let disputeTimeline = Map.empty<Text, DisputeTimelineEvent>();
  let auditLog = Map.empty<Text, AuditEntry>();
  // Supplemental state for new features
  let propertyVerificationHistory = Map.empty<Text, List.List<VerificationRecord>>();
  let transactionStageHistory = Map.empty<Text, List.List<TransactionStageEntry>>();


  func toDisputeView(dispute : Dispute) : DisputeView {
    {
      id = dispute.id;
      propertyId = dispute.propertyId;
      initiator = dispute.initiator;
      reason = dispute.reason;
      status = dispute.status;
      created = dispute.created;
      updated = dispute.updated;
      comments = dispute.comments.toArray();
    };
  };

  func fromDisputeView(view : DisputeView) : Dispute {
    let disputeComments = List.empty<Text>();
    view.comments.forEach(
      func(comment) {
        disputeComments.add(comment);
      }
    );
    {
      id = view.id;
      propertyId = view.propertyId;
      initiator = view.initiator;
      reason = view.reason;
      status = view.status;
      created = view.created;
      updated = view.updated;
      comments = disputeComments;
    };
  };

  module LandApplication {
    public func compare(a : LandApplication, b : LandApplication) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  func checkAdminPermissions(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  func checkLandOfficerOrAdmin(caller : Principal) {
    let profile = userProfiles.get(caller);
    switch (profile) {
      case (null) {
        if (not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only Land Officers or Admins can perform this action");
        };
      };
      case (?p) {
        switch (p.role) {
          case (#landOfficer or #admin) {};
          case (_) {
            if (not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Only Land Officers or Admins can perform this action");
            };
          };
        };
      };
    };
  };

  func isLandOfficerOrAdmin(caller : Principal) : Bool {
    let profile = userProfiles.get(caller);
    switch (profile) {
      case (null) { AccessControl.isAdmin(accessControlState, caller) };
      case (?p) {
        switch (p.role) {
          case (#landOfficer or #admin) { true };
          case (_) { AccessControl.isAdmin(accessControlState, caller) };
        };
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?VerifiedUserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?VerifiedUserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : VerifiedUserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserSettings() : async UserSettings {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authorized users can get their own settings");
    };
    switch (userSettings.get(caller)) {
      case (null) {
        {
          themePreference = #light;
          motionPreference = #default;
          notifications = {
            email = true;
            push = true;
            sms = false;
            criticalAlertsOnly = false;
          };
          privacy = {
            shareLocation = false;
            allowDataCollection = false;
            showPublicProfile = true;
          };
        };
      };
      case (?settings) { settings };
    };
  };

  public shared ({ caller }) func updateCallerUserSettings(settings : UserSettings) : async UserSettings {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authorized users can update their settings");
    };

    userSettings.add(caller, settings);
    settings;
  };

  public query ({ caller }) func getUserSettings(userId : Principal) : async UserSettings {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own settings");
    };
    switch (userSettings.get(userId)) {
      case (null) {
        {
          themePreference = #light;
          motionPreference = #default;
          notifications = {
            email = true;
            push = true;
            sms = false;
            criticalAlertsOnly = false;
          };
          privacy = {
            shareLocation = false;
            allowDataCollection = false;
            showPublicProfile = true;
          };
        };
      };
      case (?settings) { settings };
    };
  };

  public shared ({ caller }) func clearUserSettings() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authorized users can clear their settings");
    };
    userSettings.remove(caller);
  };

  public shared ({ caller }) func createApplication(titleNumber : Text, area : ?Nat, location : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create applications");
    };

    currentId += 1;
    let appId = currentId.toText();

    let newApplication : LandApplication = {
      id = appId;
      titleNumber;
      status = #draft;
      area;
      location;
      attachments = Set.empty<Storage.ExternalBlob>();
      created = Time.now();
      updated = Time.now();
      owner = caller;
    };

    applications.add(appId, newApplication);
    appId;
  };

  public shared ({ caller }) func submitApplication(appId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit applications");
    };

    let app = getApplicationByIdInternal(appId);

    if (app.owner != caller) {
      Runtime.trap("Unauthorized: Can only submit your own applications");
    };

    let updatedApp = { app with status = #submitted; updated = Time.now() };
    applications.add(appId, updatedApp);
  };

  public shared ({ caller }) func approveApplication(appId : Text) : async () {
    checkLandOfficerOrAdmin(caller);

    let app = getApplicationByIdInternal(appId);
    let updatedApp = { app with status = #approved; updated = Time.now() };
    applications.add(appId, updatedApp);
  };

  public shared ({ caller }) func rejectApplication(appId : Text, _reason : Text) : async () {
    checkLandOfficerOrAdmin(caller);

    let app = getApplicationByIdInternal(appId);
    let updatedApp = { app with status = #rejected; updated = Time.now() };
    applications.add(appId, updatedApp);
  };

  public shared ({ caller }) func cancelApplication(appId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can cancel applications");
    };

    let app = getApplicationByIdInternal(appId);

    if (app.owner != caller) {
      Runtime.trap("Unauthorized: Can only cancel your own applications");
    };

    let updatedApp = { app with status = #cancelled; updated = Time.now() };
    applications.add(appId, updatedApp);
  };

  public shared ({ caller }) func checkApplicationStatus(userId : Principal) : async [LandApplicationView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check application status");
    };

    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only check your own applications");
    };

    getUserApplications(userId);
  };

  public shared ({ caller }) func searchApplicationByTitleNumber(titleNumber : Text) : async [LandApplicationView] {
    checkLandOfficerOrAdmin(caller);

    searchApplicationsByField(
      func(app : LandApplication) { app.titleNumber == titleNumber }
    );
  };

  public shared ({ caller }) func uploadAttachment(appId : Text, externalBlob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload attachments");
    };

    let app = getApplicationByIdInternal(appId);

    if (app.owner != caller) {
      Runtime.trap("Unauthorized: Can only upload attachments to your own applications");
    };

    app.attachments.add(externalBlob);
    let updatedApp = { app with updated = Time.now() };
    applications.add(appId, updatedApp);
  };

  public shared ({ caller }) func getApplications(owners : [Principal]) : async [LandApplicationView] {
    checkLandOfficerOrAdmin(caller);

    applications.values().toArray().sort().map(toLandApplicationView).filter(
      func(app) { owners.any(func(owner) { app.owner == owner }) }
    );
  };

  public query ({ caller }) func getApplicationStatus(appId : Text) : async ApplicationStatus {
    switch (applications.get(appId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) { app.status };
    };
  };

  func getUserApplications(userId : Principal) : [LandApplicationView] {
    applications.values().toArray().sort().map(toLandApplicationView).filter(
      func(app) { app.owner == userId }
    );
  };

  func searchApplicationsByField(predicate : (LandApplication) -> Bool) : [LandApplicationView] {
    applications.values().toArray().sort().map(toLandApplicationView).filter(
      func(app) { predicate(fromLandApplicationView(app)) }
    );
  };

  public query ({ caller }) func searchApplicationsByTitleNumber(titleNumber : Text) : async [LandApplicationView] {
    searchApplicationsByField(
      func(app : LandApplication) {
        app.titleNumber.contains(#text titleNumber) and app.status == #approved
      }
    );
  };

  public query ({ caller }) func searchApplicationsByLocation(location : Text) : async [LandApplicationView] {
    searchApplicationsByField(
      func(app : LandApplication) {
        app.location.contains(#text location) and app.status == #approved
      }
    );
  };

  public query ({ caller }) func getApplicationsByStatusInternal(status : ApplicationStatus) : async [LandApplicationView] {
    checkLandOfficerOrAdmin(caller);

    applications.values().toArray().map(toLandApplicationView).filter(
      func(app) { app.status == status }
    );
  };

  func getApplicationByIdInternal(appId : Text) : LandApplication {
    switch (applications.get(appId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) { app };
    };
  };

  func toLandApplicationView(app : LandApplication) : LandApplicationView {
    {
      id = app.id;
      titleNumber = app.titleNumber;
      status = app.status;
      area = app.area;
      location = app.location;
      attachments = app.attachments.toArray();
      created = app.created;
      updated = app.updated;
      owner = app.owner;
    };
  };

  func fromLandApplicationView(view : LandApplicationView) : LandApplication {
    {
      id = view.id;
      titleNumber = view.titleNumber;
      status = view.status;
      area = view.area;
      location = view.location;
      attachments = Set.empty<Storage.ExternalBlob>();
      created = view.created;
      updated = view.updated;
      owner = view.owner;
    };
  };

  public query ({ caller }) func getMarketSummary(location : Text) : async ?MarketSummary {
    marketSummaries.get(location);
  };

  public query ({ caller }) func getPriceTrend(location : Text) : async [PricePoint] {
    switch (marketTrends.get(location)) {
      case (null) { [] };
      case (?points) { points };
    };
  };

  public query ({ caller }) func getDemandScore(location : Text) : async Nat {
    switch (demandScores.get(location)) {
      case (null) { 0 };
      case (?score) { score };
    };
  };

  public query ({ caller }) func getAllMarketTrends() : async [MarketTrendData] {
    let trendIter = marketTrends.entries().map(
      func((location, points)) {
        let pricePoints = points;
        let demandScore = switch (demandScores.get(location)) {
          case (null) { 0 };
          case (?score) { score };
        };
        {
          location;
          priceTrend = pricePoints;
          demandScore;
        };
      }
    );
    trendIter.toArray();
  };

  public shared ({ caller }) func recordSearch(location : Text) : async () {
    let normalizedLocation = location.toLower();

    let currentCount = switch (searchCounts.get(normalizedLocation)) {
      case (null) { 0 };
      case (?count) { count };
    };
    searchCounts.add(normalizedLocation, currentCount + 1);
  };

  public query ({ caller }) func getTopSearches(limit : Nat) : async [(Text, Nat)] {
    let sortedEntries = searchCounts.entries().toArray().sort(
      func(a, b) {
        let cmp = Nat.compare(b.1, a.1);
        if (cmp == #equal) {
          Text.compare(a.0, b.0);
        } else { cmp };
      }
    );

    let takeLimit = if (limit > sortedEntries.size()) {
      sortedEntries.size();
    } else {
      limit;
    };
    sortedEntries.sliceToArray(0, takeLimit);
  };

  public shared ({ caller }) func setMarketSummary(location : Text, summary : MarketSummary) : async () {
    checkAdminPermissions(caller);
    marketSummaries.add(location, summary);
  };

  public shared ({ caller }) func setPriceTrend(location : Text, points : [PricePoint]) : async () {
    checkAdminPermissions(caller);
    marketTrends.add(location, points);
  };

  public shared ({ caller }) func setDemandScore(location : Text, score : Nat) : async () {
    checkAdminPermissions(caller);
    demandScores.add(location, score);
  };

  public shared ({ caller }) func clearSearchCounts() : async () {
    checkAdminPermissions(caller);
    searchCounts.clear();
  };

  public shared ({ caller }) func setLocationCoordinates(location : Text, latitude : Float, longitude : Float) : async () {
    checkAdminPermissions(caller);
    let coords : Coordinates = { latitude; longitude };
    locationCoordinates.add(location, coords);
  };

  public query ({ caller }) func getLocationCoordinates(location : Text) : async ?Coordinates {
    locationCoordinates.get(location);
  };

  public query ({ caller }) func getAllCoordinates() : async [(Text, Coordinates)] {
    checkAdminPermissions(caller);
    locationCoordinates.toArray();
  };

  public query ({ caller }) func getDemandHeatMapPoints() : async [DemandHeatMapPoint] {
    let locations = demandScores.keys().toArray();
    locations.map(
      func(location) {
        {
          location;
          demandScore = switch (demandScores.get(location)) {
            case (null) { 0 };
            case (?score) { score };
          };
          coordinates = locationCoordinates.get(location);
        };
      }
    );
  };

  // Properties CRUD - Public read, LandOfficer/Admin write
  public shared ({ caller }) func createProperty(property : Property) : async () {
    checkLandOfficerOrAdmin(caller);
    if (properties.containsKey(property.id)) {
      Runtime.trap("Property with this ID already exists");
    };
    properties.add(property.id, property);
  };

  public query ({ caller }) func getProperty(id : Text) : async ?Property {
    properties.get(id);
  };

  public query ({ caller }) func listProperties() : async [Property] {
    properties.values().toArray();
  };

  public shared ({ caller }) func updateProperty(property : Property) : async () {
    checkLandOfficerOrAdmin(caller);
    if (not properties.containsKey(property.id)) {
      Runtime.trap("Property not found");
    };
    properties.add(property.id, property);
  };

  public shared ({ caller }) func deleteProperty(id : Text) : async () {
    checkAdminPermissions(caller);
    if (not properties.containsKey(id)) {
      Runtime.trap("Property not found");
    };
    properties.remove(id);
  };

  // Valuations CRUD - LandOfficer/Admin create/update, public read
  public shared ({ caller }) func createValuation(valuation : Valuation) : async () {
    checkLandOfficerOrAdmin(caller);
    if (valuations.containsKey(valuation.id)) {
      Runtime.trap("Valuation with this ID already exists");
    };
    valuations.add(valuation.id, valuation);
  };

  public query ({ caller }) func getValuation(id : Text) : async ?Valuation {
    valuations.get(id);
  };

  public query ({ caller }) func listValuations() : async [Valuation] {
    valuations.values().toArray();
  };

  public shared ({ caller }) func updateValuation(valuation : Valuation) : async () {
    checkLandOfficerOrAdmin(caller);
    if (not valuations.containsKey(valuation.id)) {
      Runtime.trap("Valuation not found");
    };
    valuations.add(valuation.id, valuation);
  };

  public shared ({ caller }) func deleteValuation(id : Text) : async () {
    checkAdminPermissions(caller);
    if (not valuations.containsKey(id)) {
      Runtime.trap("Valuation not found");
    };
    valuations.remove(id);
  };

  // Disputes CRUD - Users can create, LandOfficer/Admin manage, users can view own
  public shared ({ caller }) func createDispute(disputeView : DisputeView) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create disputes");
    };
    if (disputes.containsKey(disputeView.id)) {
      Runtime.trap("Dispute with this ID already exists");
    };
    if (disputeView.initiator != caller) {
      Runtime.trap("Unauthorized: Can only create disputes for yourself");
    };
    disputes.add(disputeView.id, fromDisputeView(disputeView));
  };

  public query ({ caller }) func getDispute(id : Text) : async ?DisputeView {
    switch (disputes.get(id)) {
      case (null) { null };
      case (?dispute) {
        if (dispute.initiator == caller or isLandOfficerOrAdmin(caller)) {
          ?toDisputeView(dispute);
        } else {
          Runtime.trap("Unauthorized: Can only view your own disputes");
        };
      };
    };
  };

  public query ({ caller }) func listDisputes() : async [DisputeView] {
    let allDisputes = disputes.values().toArray();
    if (isLandOfficerOrAdmin(caller)) {
      allDisputes.map(func(d) { toDisputeView(d) });
    } else {
      allDisputes.filter(func(d) { d.initiator == caller }).map(func(d) { toDisputeView(d) });
    };
  };

  public shared ({ caller }) func updateDispute(disputeView : DisputeView) : async () {
    checkLandOfficerOrAdmin(caller);
    if (not disputes.containsKey(disputeView.id)) {
      Runtime.trap("Dispute not found");
    };
    disputes.add(disputeView.id, fromDisputeView(disputeView));
  };

  public shared ({ caller }) func deleteDispute(id : Text) : async () {
    checkAdminPermissions(caller);
    if (not disputes.containsKey(id)) {
      Runtime.trap("Dispute not found");
    };
    disputes.remove(id);
  };

  // Market Trends CRUD - Admin write, public read
  public shared ({ caller }) func createMarketTrend(trend : MarketTrend) : async () {
    checkAdminPermissions(caller);
    if (marketTrendsMap.containsKey(trend.id)) {
      Runtime.trap("Market trend with this ID already exists");
    };
    marketTrendsMap.add(trend.id, trend);
  };

  public query ({ caller }) func getMarketTrend(id : Text) : async ?MarketTrend {
    marketTrendsMap.get(id);
  };

  public query ({ caller }) func listMarketTrends() : async [MarketTrend] {
    marketTrendsMap.values().toArray();
  };

  public shared ({ caller }) func updateMarketTrend(trend : MarketTrend) : async () {
    checkAdminPermissions(caller);
    if (not marketTrendsMap.containsKey(trend.id)) {
      Runtime.trap("Market trend not found");
    };
    marketTrendsMap.add(trend.id, trend);
  };

  public shared ({ caller }) func deleteMarketTrend(id : Text) : async () {
    checkAdminPermissions(caller);
    if (not marketTrendsMap.containsKey(id)) {
      Runtime.trap("Market trend not found");
    };
    marketTrendsMap.remove(id);
  };

  // Property Report CRUD - LandOfficer/Admin create, public read
  public shared ({ caller }) func createPropertyReport(report : PropertyReport) : async () {
    checkLandOfficerOrAdmin(caller);
    if (propertyReports.containsKey(report.id)) {
      Runtime.trap("Property report with this ID already exists");
    };
    if (report.author != caller) {
      Runtime.trap("Unauthorized: Can only create reports as yourself");
    };
    propertyReports.add(report.id, report);
  };

  public query ({ caller }) func getPropertyReport(id : Text) : async ?PropertyReport {
    propertyReports.get(id);
  };

  public query ({ caller }) func listPropertyReports() : async [PropertyReport] {
    propertyReports.values().toArray();
  };

  public shared ({ caller }) func updatePropertyReport(report : PropertyReport) : async () {
    switch (propertyReports.get(report.id)) {
      case (null) { Runtime.trap("Property report not found") };
      case (?existing) {
        if (existing.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own reports");
        };
        propertyReports.add(report.id, report);
      };
    };
  };

  public shared ({ caller }) func deletePropertyReport(id : Text) : async () {
    switch (propertyReports.get(id)) {
      case (null) { Runtime.trap("Property report not found") };
      case (?existing) {
        if (existing.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own reports");
        };
        propertyReports.remove(id);
      };
    };
  };

  // Notifications CRUD - Admin create, recipient read/update
  public shared ({ caller }) func createNotification(notification : Notification) : async () {
    checkAdminPermissions(caller);
    if (notifications.containsKey(notification.id)) {
      Runtime.trap("Notification with this ID already exists");
    };
    notifications.add(notification.id, notification);
  };

  public query ({ caller }) func getNotification(id : Text) : async ?Notification {
    switch (notifications.get(id)) {
      case (null) { null };
      case (?notif) {
        if (notif.recipient == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?notif;
        } else {
          Runtime.trap("Unauthorized: Can only view your own notifications");
        };
      };
    };
  };

  public query ({ caller }) func listNotifications() : async [Notification] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      notifications.values().toArray();
    } else {
      notifications.values().toArray().filter(func(n) { n.recipient == caller });
    };
  };

  public shared ({ caller }) func updateNotification(notification : Notification) : async () {
    switch (notifications.get(notification.id)) {
      case (null) { Runtime.trap("Notification not found") };
      case (?existing) {
        if (existing.recipient != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own notifications");
        };
        notifications.add(notification.id, notification);
      };
    };
  };

  public shared ({ caller }) func deleteNotification(id : Text) : async () {
    switch (notifications.get(id)) {
      case (null) { Runtime.trap("Notification not found") };
      case (?existing) {
        if (existing.recipient != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own notifications");
        };
        notifications.remove(id);
      };
    };
  };

  // Infrastructure Projects CRUD - Admin write, public read
  public shared ({ caller }) func createInfrastructureProject(project : InfrastructureProject) : async () {
    checkAdminPermissions(caller);
    if (infrastructureProjects.containsKey(project.id)) {
      Runtime.trap("Infrastructure project with this ID already exists");
    };
    infrastructureProjects.add(project.id, project);
  };

  public query ({ caller }) func getInfrastructureProject(id : Text) : async ?InfrastructureProject {
    infrastructureProjects.get(id);
  };

  public query ({ caller }) func listInfrastructureProjects() : async [InfrastructureProject] {
    infrastructureProjects.values().toArray();
  };

  public shared ({ caller }) func updateInfrastructureProject(project : InfrastructureProject) : async () {
    checkAdminPermissions(caller);
    if (not infrastructureProjects.containsKey(project.id)) {
      Runtime.trap("Infrastructure project not found");
    };
    infrastructureProjects.add(project.id, project);
  };

  public shared ({ caller }) func deleteInfrastructureProject(id : Text) : async () {
    checkAdminPermissions(caller);
    if (not infrastructureProjects.containsKey(id)) {
      Runtime.trap("Infrastructure project not found");
    };
    infrastructureProjects.remove(id);
  };

  // Transactions CRUD - LandOfficer/Admin create/update, parties can view own
  public shared ({ caller }) func createTransaction(transaction : Transaction) : async () {
    checkLandOfficerOrAdmin(caller);
    if (transactions.containsKey(transaction.id)) {
      Runtime.trap("Transaction with this ID already exists");
    };
    transactions.add(transaction.id, transaction);
  };

  public query ({ caller }) func getTransaction(id : Text) : async ?Transaction {
    switch (transactions.get(id)) {
      case (null) { null };
      case (?txn) {
        if (txn.buyer == caller or txn.seller == caller or isLandOfficerOrAdmin(caller)) {
          ?txn;
        } else {
          Runtime.trap("Unauthorized: Can only view your own transactions");
        };
      };
    };
  };

  public query ({ caller }) func listTransactions() : async [Transaction] {
    if (isLandOfficerOrAdmin(caller)) {
      transactions.values().toArray();
    } else {
      transactions.values().toArray().filter(
        func(t) { t.buyer == caller or t.seller == caller }
      );
    };
  };

  public shared ({ caller }) func updateTransaction(transaction : Transaction) : async () {
    checkLandOfficerOrAdmin(caller);
    if (not transactions.containsKey(transaction.id)) {
      Runtime.trap("Transaction not found");
    };
    transactions.add(transaction.id, transaction);
  };

  public shared ({ caller }) func deleteTransaction(id : Text) : async () {
    checkAdminPermissions(caller);
    if (not transactions.containsKey(id)) {
      Runtime.trap("Transaction not found");
    };
    transactions.remove(id);
  };

  // Saved Properties CRUD - User owns their saved properties
  public shared ({ caller }) func createSavedProperty(savedProperty : SavedProperty) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save properties");
    };
    if (savedProperties.containsKey(savedProperty.id)) {
      Runtime.trap("Saved property with this ID already exists");
    };
    if (savedProperty.userId != caller) {
      Runtime.trap("Unauthorized: Can only save properties for yourself");
    };
    savedProperties.add(savedProperty.id, savedProperty);
  };

  public query ({ caller }) func getSavedProperty(id : Text) : async ?SavedProperty {
    switch (savedProperties.get(id)) {
      case (null) { null };
      case (?saved) {
        if (saved.userId == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?saved;
        } else {
          Runtime.trap("Unauthorized: Can only view your own saved properties");
        };
      };
    };
  };

  public query ({ caller }) func listSavedProperties() : async [SavedProperty] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      savedProperties.values().toArray();
    } else {
      savedProperties.values().toArray().filter(func(s) { s.userId == caller });
    };
  };

  public shared ({ caller }) func updateSavedProperty(savedProperty : SavedProperty) : async () {
    switch (savedProperties.get(savedProperty.id)) {
      case (null) { Runtime.trap("Saved property not found") };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own saved properties");
        };
        savedProperties.add(savedProperty.id, savedProperty);
      };
    };
  };

  public shared ({ caller }) func deleteSavedProperty(id : Text) : async () {
    switch (savedProperties.get(id)) {
      case (null) { Runtime.trap("Saved property not found") };
      case (?existing) {
        if (existing.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own saved properties");
        };
        savedProperties.remove(id);
      };
    };
  };

  public shared ({ caller }) func setCallerPreferences(prefs : Preferences) : async () {
    userPreferences.add(caller, prefs);
  };

  public query ({ caller }) func getCallerPreferences() : async Preferences {
    switch (userPreferences.get(caller)) {
      case (null) {
        {
          notifyPriceDrops = true;
          notifyDisputes = true;
          notifyNewListings = true;
          notifyInfrastructureUpdates = true;
          notifyMarketTrends = true;
          preferredRegions = [];
          riskTolerance = #medium;
          aiPersonalization = {
            investmentGoals = ["diversification"];
            riskAppetite = #medium;
            preferredLandType = "residential";
            budgetRange = { minBudget = 10000; maxBudget = 100000 };
            growthExpectation = 10;
          };
        };
      };
      case (?prefs) { prefs };
    };
  };

  public query ({ caller }) func getUserPreferences(_userId : Principal) : async Preferences {
    switch (userPreferences.get(caller)) {
      case (null) {
        {
          notifyPriceDrops = true;
          notifyDisputes = true;
          notifyNewListings = true;
          notifyInfrastructureUpdates = true;
          notifyMarketTrends = true;
          preferredRegions = [];
          riskTolerance = #medium;
          aiPersonalization = {
            investmentGoals = ["diversification"];
            riskAppetite = #medium;
            preferredLandType = "residential";
            budgetRange = { minBudget = 10000; maxBudget = 100000 };
            growthExpectation = 10;
          };
        };
      };
      case (?prefs) { prefs };
    };
  };

  public shared ({ caller }) func clearCallerPreferences() : async () {
    userPreferences.remove(caller);
  };

  // Messaging System
  public shared ({ caller }) func sendMessage(receiver : Principal, content : Text) : async SendMessageResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can send messages");
    };

    let messageId = Time.now().toText();
    let conversationId = computeConversationId(caller, receiver);

    let newMessage : Message = {
      id = messageId;
      sender = caller;
      receiver;
      content;
      timestamp = Time.now();
      read = false;
    };

    let conversation = switch (conversations.get(conversationId)) {
      case (null) {
        {
          id = conversationId;
          participantA = caller;
          participantB = receiver;
          messages = [newMessage];
          lastMessageTimestamp = Time.now();
        };
      };
      case (?existing) {
        let updatedMessages = Array.tabulate(existing.messages.size() + 1, func(i) { if (i < existing.messages.size()) { existing.messages[i] } else { newMessage } });
        {
          existing with messages = updatedMessages; lastMessageTimestamp = Time.now();
        };
      };
    };

    conversations.add(conversationId, conversation);
    { success = true; message = "Message sent successfully" };
  };

  public query ({ caller }) func getConversations() : async [ConversationSummary] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view conversations");
    };
    getConversationsInternal(caller);
  };

  func getConversationsInternal(caller : Principal) : [ConversationSummary] {
    conversations.values().toArray().filter(func(c) { c.participantA == caller or c.participantB == caller }).map(
      func(conv) {
        let unreadCount = conv.messages.filter(
          func(msg) { msg.receiver == caller and not msg.read }
        ).size();
        {
          id = conv.id;
          participantA = conv.participantA;
          participantB = conv.participantB;
          lastMessageTimestamp = conv.lastMessageTimestamp;
          unreadMessagesCount = unreadCount;
        };
      }
    );
  };

  public query ({ caller }) func getConversation(partner : Principal) : async ?Conversation {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view conversations");
    };

    let conversationId = computeConversationId(caller, partner);
    switch (conversations.get(conversationId)) {
      case (null) { null };
      case (?conversation) {
        if (conversation.participantA == caller or conversation.participantB == caller) {
          ?conversation;
        } else {
          Runtime.trap("Unauthorized: Can only view your own conversations");
        };
      };
    };
  };

  public query ({ caller }) func getConversationMessages(partner : Principal) : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view messages");
    };

    let conversationId = computeConversationId(caller, partner);
    switch (conversations.get(conversationId)) {
      case (null) { [] };
      case (?conversation) {
        if (conversation.participantA != caller and conversation.participantB != caller) {
          Runtime.trap("Unauthorized: Can only view messages in your own conversations");
        };

        conversation.messages.map(
          func(msg) {
            if (msg.receiver == caller) {
              if (not msg.read) { markMessageAsRead(caller, conversationId, msg.id) };
              { msg with read = true };
            } else {
              msg;
            };
          }
        );
      };
    };
  };

  func markMessageAsRead(caller : Principal, conversationId : Text, messageId : Text) {
    switch (conversations.get(conversationId)) {
      case (null) {};
      case (?conversation) {
        let updatedMessages = conversation.messages.map(
          func(msg) {
            if (msg.id == messageId and msg.receiver == caller) {
              { msg with read = true };
            } else { msg };
          }
        );
        let updatedConversation = { conversation with messages = updatedMessages };
        conversations.add(conversationId, updatedConversation);
      };
    };
  };

  public query ({ caller }) func searchUsers(searchTerm : Text) : async [(Principal, VerifiedUserProfile)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can search for users");
    };

    if (searchTerm == "") { Runtime.trap("Filter cannot be empty") };
    let filteredUsers = userProfiles.entries().toArray().filter(
      func((_, profile)) {
        profile.name.contains(#text searchTerm);
      }
    );
    filteredUsers;
  };

  func computeConversationId(userA : Principal, userB : Principal) : Text {
    let principalA = principalToNat(userA);
    let principalB = principalToNat(userB);

    let orderedPrincipalA = if (principalA < principalB) { userA } else { userB };
    let orderedPrincipalB = if (principalA < principalB) { userB } else { userA };

    orderedPrincipalA.toText() # "_" # orderedPrincipalB.toText();
  };

  func principalToNat(p : Principal) : Nat {
    var sum = 0;
    let bytes = p.toText().toArray();

    let bytesNat = bytes.map(func(_byte) { 0 });
    for (byte in bytesNat.values()) {
      sum += byte;
    };
    sum;
  };

  public query ({ caller }) func getUserConversations(userId : Principal) : async [ConversationSummary] {
    checkAdminPermissions(caller);
    getConversationsInternal(userId);
  };

  public shared ({ caller }) func markAllMessagesAsRead(conversationId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can mark messages as read");
    };

    switch (conversations.get(conversationId)) {
      case (null) { () };
      case (?conversation) {
        if (conversation.participantA != caller and conversation.participantB != caller) {
          Runtime.trap("Unauthorized: Can only mark messages as read in your own conversations");
        };

        let updatedMessages = conversation.messages.map(
          func(msg) {
            if (msg.receiver == caller and not msg.read) {
              { msg with read = true };
            } else { msg };
          }
        );
        let updatedConversation = { conversation with messages = updatedMessages };
        conversations.add(conversationId, updatedConversation);
      };
    };
  };

  public shared ({ caller }) func deleteConversation(conversationId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can delete conversations");
    };

    switch (conversations.get(conversationId)) {
      case (null) { () };
      case (?conversation) {
        if (conversation.participantA != caller and conversation.participantB != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only participants or admins can delete conversations");
        } else {
          conversations.remove(conversationId);
        };
      };
    };
  };

  // --- Title Deed Verification ---
  public shared(msg) func submitForVerification(propertyId : Text) : async { #ok; #err : Text } {
    let caller = msg.caller;
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return #err("Unauthorized: Only users can submit for verification");
    };
    switch (properties.get(propertyId)) {
      case (null) { return #err("Property not found") };
      case (?prop) {
        if (prop.owner != caller) {
          return #err("Unauthorized: Only the owner can submit this property for verification");
        };
        let record : VerificationRecord = {
          officerId = caller;
          timestamp = Time.now();
          status = #pendingReview;
          notes = "Submitted by owner";
        };
        let history = switch (propertyVerificationHistory.get(propertyId)) {
          case (null) { List.empty<VerificationRecord>() };
          case (?h) { h };
        };
        history.add(record);
        propertyVerificationHistory.add(propertyId, history);
        currentId += 1;
        let auditId = "AUD-" # currentId.toText();
        auditLog.add(auditId, {
          id = auditId;
          initiator = caller;
          actionType = "submitForVerification";
          entityType = "Property";
          entityId = propertyId;
          timestamp = Time.now();
          details = "Owner submitted property for verification";
        });
        #ok;
      };
    };
  };
  public shared(msg) func officerVerifyTitle(propertyId : Text, status : VerificationStatus, notes : Text) : async { #ok; #err : Text } {
    let caller = msg.caller;
    checkLandOfficerOrAdmin(caller);
    switch (properties.get(propertyId)) {
      case (null) { return #err("Property not found") };
      case (?_prop) {
        let record : VerificationRecord = {
          officerId = caller;
          timestamp = Time.now();
          status;
          notes;
        };
        let history = switch (propertyVerificationHistory.get(propertyId)) {
          case (null) { List.empty<VerificationRecord>() };
          case (?h) { h };
        };
        history.add(record);
        propertyVerificationHistory.add(propertyId, history);
        currentId += 1;
        let auditId = "AUD-" # currentId.toText();
        let statusText = switch (status) {
          case (#verified) { "verified" };
          case (#rejected) { "rejected" };
          case (#pendingReview) { "pendingReview" };
          case (#unverified) { "unverified" };
        };
        auditLog.add(auditId, {
          id = auditId;
          initiator = caller;
          actionType = "officerVerifyTitle";
          entityType = "Property";
          entityId = propertyId;
          timestamp = Time.now();
          details = "Officer set status to " # statusText # ": " # notes;
        });
        #ok;
      };
    };
  };
  public shared func getTitleVerificationHistory(propertyId : Text) : async { #ok : [VerificationRecord]; #err : Text } {
    switch (propertyVerificationHistory.get(propertyId)) {
      case (null) { #ok([]) };
      case (?history) { #ok(history.toArray()) };
    };
  };

  // --- Multi-Stage Transaction Workflow ---
  public shared(msg) func advanceTransactionStage(transactionId : Text, notes : Text) : async { #ok; #err : Text } {
    let caller = msg.caller;
    switch (transactions.get(transactionId)) {
      case (null) { return #err("Transaction not found") };
      case (?txn) {
        let isParty = txn.buyer == caller or txn.seller == caller;
        let isOfficer = isLandOfficerOrAdmin(caller);
        if (not isParty and not isOfficer) {
          return #err("Unauthorized: Only transaction parties or officers can advance stages");
        };
        let history = switch (transactionStageHistory.get(transactionId)) {
          case (null) { List.empty<TransactionStageEntry>() };
          case (?h) { h };
        };
        let currentStage : TransactionStage = switch (history.size()) {
          case (0) { #proposed };
          case (_) {
            switch (history.toArray()[history.size() - 1].stage) {
              case (#proposed) { #escrow };
              case (#escrow) { #stampDuty };
              case (#stampDuty) { #recorded };
              case (#recorded) { #completed };
              case (#completed) { return #err("Transaction is already completed") };
              case (#cancelled) { return #err("Transaction has been cancelled") };
            };
          };
        };
        let entry : TransactionStageEntry = {
          stage = currentStage;
          initiator = caller;
          timestamp = Time.now();
          notes;
        };
        history.add(entry);
        transactionStageHistory.add(transactionId, history);
        currentId += 1;
        let auditId = "AUD-" # currentId.toText();
        let stageText = switch (currentStage) {
          case (#proposed) { "proposed" };
          case (#escrow) { "escrow" };
          case (#stampDuty) { "stampDuty" };
          case (#recorded) { "recorded" };
          case (#completed) { "completed" };
          case (#cancelled) { "cancelled" };
        };
        auditLog.add(auditId, {
          id = auditId;
          initiator = caller;
          actionType = "advanceTransactionStage";
          entityType = "Transaction";
          entityId = transactionId;
          timestamp = Time.now();
          details = "Advanced to stage: " # stageText # " — " # notes;
        });
        #ok;
      };
    };
  };
  public shared func getTransactionStageHistory(transactionId : Text) : async { #ok : [TransactionStageEntry]; #err : Text } {
    switch (transactionStageHistory.get(transactionId)) {
      case (null) { #ok([]) };
      case (?history) { #ok(history.toArray()) };
    };
  };

  // --- Dispute Evidence & Timeline ---
  public shared(msg) func addDisputeEvidence(disputeId : Text, fileId : Text, fileName : Text, fileSize : Nat, description : Text) : async { #ok : Text; #err : Text } {
    let caller = msg.caller;
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return #err("Unauthorized");
    };
    if (not disputes.containsKey(disputeId)) {
      return #err("Dispute not found");
    };
    currentId += 1;
    let evidenceId = "EVD-" # currentId.toText();
    let evidence : DisputeEvidence = {
      id = evidenceId;
      disputeId;
      fileId;
      fileName;
      fileSize;
      uploadedBy = caller;
      timestamp = Time.now();
      description;
    };
    disputeEvidence.add(evidenceId, evidence);
    currentId += 1;
    let eventId = "TLE-" # currentId.toText();
    let event : DisputeTimelineEvent = {
      id = eventId;
      disputeId;
      eventType = "evidence_uploaded";
      description = "Evidence uploaded: " # fileName;
      initiator = caller;
      timestamp = Time.now();
      evidenceIds = [evidenceId];
    };
    disputeTimeline.add(eventId, event);
    currentId += 1;
    let auditId = "AUD-" # currentId.toText();
    auditLog.add(auditId, {
      id = auditId;
      initiator = caller;
      actionType = "addDisputeEvidence";
      entityType = "Dispute";
      entityId = disputeId;
      timestamp = Time.now();
      details = "Evidence file '" # fileName # "' uploaded (" # fileId # ")";
    });
    #ok(evidenceId);
  };
  public shared func getDisputeEvidence(disputeId : Text) : async { #ok : [DisputeEvidence]; #err : Text } {
    let results = disputeEvidence.values().toArray().filter(
      func(e : DisputeEvidence) : Bool { e.disputeId == disputeId }
    );
    #ok(results);
  };
  public shared func getDisputeTimeline(disputeId : Text) : async { #ok : [DisputeTimelineEvent]; #err : Text } {
    let results = disputeTimeline.values().toArray().filter(
      func(e : DisputeTimelineEvent) : Bool { e.disputeId == disputeId }
    );
    let sorted = results.sort(func(a : DisputeTimelineEvent, b : DisputeTimelineEvent) : Order.Order {
      Int.compare(a.timestamp, b.timestamp)
    });
    #ok(sorted);
  };

  // --- Audit Trail ---
  public shared func getAuditLog(entityId : ?Text, actionType : ?Text, limit : Nat) : async [AuditEntry] {
    let allEntries = auditLog.values().toArray().sort(
      func(a : AuditEntry, b : AuditEntry) : Order.Order { Int.compare(b.timestamp, a.timestamp) }
    );
    let filtered = allEntries.filter(func(e : AuditEntry) : Bool {
      let matchEntity = switch (entityId) {
        case (null) { true };
        case (?eid) { e.entityId == eid };
      };
      let matchAction = switch (actionType) {
        case (null) { true };
        case (?at) { e.actionType == at };
      };
      matchEntity and matchAction
    });
    let takeLimit = if (limit > filtered.size()) { filtered.size() } else { limit };
    filtered.sliceToArray(0, takeLimit);
  };
  public shared func exportAuditCsv(entityId : ?Text) : async Text {
    let allEntries = auditLog.values().toArray().sort(
      func(a : AuditEntry, b : AuditEntry) : Order.Order { Int.compare(b.timestamp, a.timestamp) }
    );
    let filtered = allEntries.filter(func(e : AuditEntry) : Bool {
      switch (entityId) {
        case (null) { true };
        case (?eid) { e.entityId == eid };
      }
    });
    var csv = "id,actor,actionType,entityType,entityId,timestamp,details\n";
    for (entry in filtered.values()) {
      csv := csv # entry.id # "," # entry.initiator.toText() # "," # entry.actionType # "," # entry.entityType # "," # entry.entityId # "," # entry.timestamp.toText() # ",\"" # entry.details # "\"\n";
    };
    csv;
  };

  // --- AI Valuation Calculator ---
  public shared func calculateValuation(input : ValuationInput) : async { #ok : ValuationResult; #err : Text } {
    let locationLower = input.location.toLower();
    let isNairobi = locationLower.contains(#text "nairobi");
    let basePricePerAcre : Float = if (isNairobi) { 500_000.0 } else { 200_000.0 };
    let roadMultiplier : Float = if (input.roadAccess) { 1.25 } else { 1.0 };
    let amenityCount : Float = input.nearbyAmenities.size().toFloat();
    let amenityBonus : Float = amenityCount * 50_000.0;
    let baseValue : Float = basePricePerAcre * input.landSizeAcres * roadMultiplier + amenityBonus;
    let growthForecast : Float = if (isNairobi) { 8.5 } else { 6.0 };
    let rawConfidence : Float = 0.75 + (amenityCount * 0.05);
    let confidenceScore : Float = if (rawConfidence > 0.95) { 0.95 } else { rawConfidence };
    let investmentPotential : Text = if (baseValue > 5_000_000.0) { "High" } else if (baseValue > 2_000_000.0) { "Medium" } else { "Low" };
    let result : ValuationResult = {
      estimatedValueKES = baseValue;
      investmentPotential;
      growthForecastPercent = growthForecast;
      confidenceScore;
      comparableProperties = [];
    };
    #ok(result);
  };

  // --- Investment Calculator ---
  public shared func calculateInvestment(input : InvestmentInput) : async InvestmentResult {
    let rate = input.annualGrowthRatePercent / 100.0;
    // Compute (1 + rate)^years via repeated multiplication
    var growthFactor : Float = 1.0;
    var yr = 0;
    while (yr < input.investmentYears) {
      growthFactor := growthFactor * (1.0 + rate);
      yr += 1;
    };
    let projectedValue = input.buyingPriceKES * growthFactor;
    let profit = projectedValue - input.buyingPriceKES;
    let profitPercent = if (input.buyingPriceKES > 0.0) { (profit / input.buyingPriceKES) * 100.0 } else { 0.0 };
    let roiPercent = profitPercent;
    let breakEvenYears = if (rate > 0.0) { 0.693 / rate } else { 0.0 };
    {
      projectedValueKES = projectedValue;
      profitKES = profit;
      profitPercent;
      roiPercent;
      breakEvenYears;
    };
  };

  // --- Dashboard Stats ---
  public shared func getDashboardStats() : async DashboardStats {
    let totalRegisteredTitles = properties.size();
    var verifiedOwners = 0;
    var estimatedTotalLandValue : Float = 0.0;
    for (prop in properties.values()) {
      estimatedTotalLandValue := estimatedTotalLandValue + prop.value;
      switch (propertyVerificationHistory.get(prop.id)) {
        case (null) {};
        case (?history) {
          let arr = history.toArray();
          if (arr.size() > 0) {
            switch (arr[arr.size() - 1].status) {
              case (#verified) { verifiedOwners += 1 };
              case (_) {};
            };
          };
        };
      };
    };
    var pendingTransactions = 0;
    for (txn in transactions.values()) {
      if (txn.status == #initiated) { pendingTransactions += 1 };
    };
    var activeDisputes = 0;
    for (d in disputes.values()) {
      switch (d.status) {
        case (#open or #underReview) { activeDisputes += 1 };
        case (_) {};
      };
    };
    let allApps = applications.values().toArray().sort(
      func(a : LandApplication, b : LandApplication) : Order.Order { Int.compare(b.created, a.created) }
    );
    let takeCount = if (allApps.size() < 5) { allApps.size() } else { 5 };
    let recentAppsSlice = allApps.sliceToArray(0, takeCount);
    var recentApplicationsList = List.empty<{ id : Text; titleNumber : Text; status : Text; created : Time.Time }>();
    for (app in recentAppsSlice.vals()) {
      recentApplicationsList.add({
        id = app.id;
        titleNumber = app.titleNumber;
        status = switch (app.status) {
          case (#draft) { "draft" };
          case (#submitted) { "submitted" };
          case (#underReview) { "underReview" };
          case (#approved) { "approved" };
          case (#rejected) { "rejected" };
          case (#cancelled) { "cancelled" };
        };
        created = app.created;
      });
    };
    let recentApplications = recentApplicationsList.toArray();
    {
      totalRegisteredTitles;
      verifiedOwners;
      pendingTransactions;
      activeDisputes;
      estimatedTotalLandValue;
      recentApplications;
    };
  };

  // --- Market Analytics ---
  public shared func getMarketAnalytics(region : ?Text) : async MarketAnalytics {
    // Build pricesByRegion from MarketTrend records
    let regionPriceMap = Map.empty<Text, Float>();
    let regionCountMap = Map.empty<Text, Nat>();
    for (trend in marketTrendsMap.values()) {
      let loc = switch (region) {
        case (null) { trend.location };
        case (?r) { if (trend.location == r) { trend.location } else { "" } };
      };
      if (loc != "") {
        let existing = switch (regionPriceMap.get(loc)) { case (null) { 0.0 }; case (?v) { v } };
        let count = switch (regionCountMap.get(loc)) { case (null) { 0 }; case (?c) { c } };
        regionPriceMap.add(loc, existing + trend.price);
        regionCountMap.add(loc, count + 1);
      };
    };
    let pricesByRegionEntries = regionPriceMap.entries().toArray();
    var pricesByRegionList = List.empty<(Text, Float)>();
    for ((loc, totalPrice) in pricesByRegionEntries.vals()) {
      let count = switch (regionCountMap.get(loc)) { case (null) { 1 }; case (?c) { if (c == 0) { 1 } else { c } } };
      let cf : Float = if (count == 0) { 1.0 } else { count.toFloat() };
      pricesByRegionList.add((loc, totalPrice / cf));
    };
    let pricesByRegion = pricesByRegionList.toArray();
    // Appreciation rates: flat 8.5% Nairobi, 6.0% others
    var appreciationRatesList = List.empty<(Text, Float)>();
    for ((loc, _) in pricesByRegion.vals()) {
      let rate = if (loc.toLower().contains(#text "nairobi")) { 8.5 } else { 6.0 };
      appreciationRatesList.add((loc, rate));
    };
    let appreciationRates = appreciationRatesList.toArray();
    var activeListings = 0;
    for (prop in properties.values()) {
      if (prop.status == #active) { activeListings += 1 };
    };
    let topRegions = demandScores.entries().toArray().sort(
      func(a : (Text, Nat), b : (Text, Nat)) : Order.Order { Nat.compare(b.1, a.1) }
    ).map(func(entry : (Text, Nat)) : Text { entry.0 });
    let takeTop = if (topRegions.size() < 5) { topRegions.size() } else { 5 };
    {
      pricesByRegion;
      appreciationRates;
      activeListings;
      topRegions = topRegions.sliceToArray(0, takeTop);
    };
  };

  // --- Marketplace Listings ---
  public shared func getMarketplaceListings(verified : ?Bool, minPrice : ?Float, maxPrice : ?Float) : async [Property] {
    properties.values().toArray().filter(func(prop : Property) : Bool {
      let passesVerification = switch (verified) {
        case (null) { true };
        case (?true) {
          switch (propertyVerificationHistory.get(prop.id)) {
            case (null) { false };
            case (?history) {
              let arr = history.toArray();
              if (arr.size() > 0) {
                arr[arr.size() - 1].status == #verified;
              } else { false };
            };
          };
        };
        case (?false) { true };
      };
      let passesMin = switch (minPrice) {
        case (null) { true };
        case (?min) { prop.value >= min };
      };
      let passesMax = switch (maxPrice) {
        case (null) { true };
        case (?max) { prop.value <= max };
      };
      passesVerification and passesMin and passesMax
    });
  };

  // --- Risk Intelligence ---
  public shared func getRiskIntelligenceSummary(region : ?Text) : async RiskSummary {
    // Count disputes per property
    let disputeCountMap = Map.empty<Text, Nat>();
    let allDisputes = disputes.values().toArray();
    for (d in allDisputes.vals()) {
      let propId = d.propertyId;
      // Filter by region if provided
      let includeRegion = switch (region) {
        case (null) { true };
        case (?r) {
          switch (properties.get(propId)) {
            case (null) { false };
            case (?prop) { prop.location == r };
          };
        };
      };
      if (includeRegion) {
        let count = switch (disputeCountMap.get(propId)) { case (null) { 0 }; case (?c) { c } };
        disputeCountMap.add(propId, count + 1);
      };
    };
    var filteredDisputesList = List.empty<Dispute>();
    for (d in allDisputes.vals()) {
      let shouldInclude = switch (region) {
        case (null) { true };
        case (?r) {
          switch (properties.get(d.propertyId)) {
            case (null) { false };
            case (?prop) { prop.location == r };
          };
        };
      };
      if (shouldInclude) { filteredDisputesList.add(d) };
    };
    let filteredDisputes = filteredDisputesList.toArray();
    var activeDisputeCount = 0;
    for (d in filteredDisputes.vals()) {
      switch (d.status) {
        case (#open or #underReview) { activeDisputeCount += 1 };
        case (_) {};
      };
    };
    var fraudAlertCount = 0;
    for (d in filteredDisputes.vals()) {
      if (d.reason.contains(#text "fraud")) { fraudAlertCount += 1 };
    };
    var highRiskPropsBuf = List.empty<Text>();
    for ((propId, count) in disputeCountMap.entries()) {
      if (count >= 2) { highRiskPropsBuf.add(propId) };
    };
    let highRiskProperties = highRiskPropsBuf.toArray();
    let totalProps = properties.size();
    let activeDF : Float = if (activeDisputeCount == 0) { 0.0 } else { activeDisputeCount.toFloat() };
    let totalPF : Float = if (totalProps == 0) { 1.0 } else { totalProps.toFloat() };
    let riskScore = activeDF / totalPF * 10.0;
    var recentDisputeViewsBuf = List.empty<DisputeView>();
    for (d in filteredDisputes.vals()) {
      recentDisputeViewsBuf.add(toDisputeView(d));
    };
    let recentDisputeViewsArr = recentDisputeViewsBuf.toArray();
    let takeRecent = if (recentDisputeViewsArr.size() < 10) { recentDisputeViewsArr.size() } else { 10 };
    {
      recentDisputes = recentDisputeViewsArr.sliceToArray(0, takeRecent);
      fraudAlertCount;
      highRiskProperties;
      riskScore;
    };
  };

  // --- Notification Feed ---
  public shared(msg) func getNotificationFeed(limit : Nat) : async [NotificationFeedItem] {
    let caller = msg.caller;
    let callerNotifs = notifications.values().toArray().filter(
      func(n : Notification) : Bool { n.recipient == caller }
    ).sort(func(a : Notification, b : Notification) : Order.Order { Int.compare(b.timestamp, a.timestamp) });
    let takeLimit = if (limit > callerNotifs.size()) { callerNotifs.size() } else { limit };
    let notifSlice = callerNotifs.sliceToArray(0, takeLimit);
    var feedList = List.empty<NotificationFeedItem>();
    for (n in notifSlice.vals()) {
      feedList.add({
        id = n.id;
        type_ = "general";
        title = "Notification";
        body = n.message;
        timestamp = n.timestamp;
        read = n.read;
        link = null;
      });
    };
    feedList.toArray();
  };
  public shared(msg) func markNotificationRead(id : Text) : async { #ok; #err : Text } {
    let caller = msg.caller;
    switch (notifications.get(id)) {
      case (null) { #err("Notification not found") };
      case (?notif) {
        if (notif.recipient != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          return #err("Unauthorized: Can only mark your own notifications as read");
        };
        notifications.add(id, { notif with read = true });
        #ok;
      };
    };
  };

  // --- Investment Portfolio ---
  public shared(msg) func getInvestmentPortfolioSummary() : async PortfolioSummary {
    let caller = msg.caller;
    let ownedProperties = properties.values().toArray().filter(
      func(prop : Property) : Bool { prop.owner == caller }
    );
    var totalValue : Float = 0.0;
    var lowRisk = 0;
    var mediumRisk = 0;
    var highRisk = 0;
    for (prop in ownedProperties.vals()) {
      totalValue := totalValue + prop.value;
      switch (propertyVerificationHistory.get(prop.id)) {
        case (null) { highRisk += 1 };
        case (?history) {
          let arr = history.toArray();
          if (arr.size() > 0) {
            switch (arr[arr.size() - 1].status) {
              case (#verified) { lowRisk += 1 };
              case (#pendingReview) { mediumRisk += 1 };
              case (#unverified or #rejected) { highRisk += 1 };
            };
          } else { highRisk += 1 };
        };
      };
    };
    {
      properties = ownedProperties;
      totalEstimatedValue = totalValue;
      annualGrowthRate = 8.0;
      riskDistribution = { low = lowRisk; medium = mediumRisk; high = highRisk };
    };
  };

  // --- Infrastructure Timeline ---
  public shared func getInfrastructureTimeline(region : ?Text) : async [InfrastructureTimelineItem] {
    infrastructureProjects.values().toArray().filter(func(proj : InfrastructureProject) : Bool {
      switch (region) {
        case (null) { true };
        case (?r) { proj.location == r };
      }
    }).map<InfrastructureProject, InfrastructureTimelineItem>(func(proj : InfrastructureProject) : InfrastructureTimelineItem {
      let statusText = switch (proj.status) {
        case (#planned) { "planned" };
        case (#ongoing) { "ongoing" };
        case (#completed) { "completed" }
      };
      {
        id = proj.id;
        name = proj.name;
        type_ = "infrastructure";
        region = proj.location;
        status = statusText;
        startDate = proj.created;
        endDate = null;
        impactRadius = 2.0;
        description = proj.details
      }
    });
  };

  // --- Property Report ---
  public shared(msg) func generatePropertyReport(propertyId : Text) : async { #ok : GeneratedPropertyReport; #err : Text } {
    switch (properties.get(propertyId)) {
      case null { #err("Property not found") };
      case (?prop) {
        var reportContent = "=== GEO SENTINEL PROPERTY REPORT ===\n\n";
        reportContent := reportContent # "PROPERTY DETAILS\nTitle: " # prop.titleNumber # "\nLocation: " # prop.location # "\nArea: " # prop.area.toText() # " acres\nValue: KES " # prop.value.toText() # "\n\n";
        reportContent := reportContent # "DISPUTE RECORDS\n";
        var hasDisputes = false;
        for ((_, d) in disputes.entries()) {
          if (d.propertyId == propertyId) {
            hasDisputes := true;
            let dStatus = switch (d.status) { case (#open) { "Open" }; case (#underReview) { "Under Review" }; case (#resolved) { "Resolved" }; };
            reportContent := reportContent # "  [" # d.id # "] " # dStatus # " - " # d.reason # "\n";
          };
        };
        if (not hasDisputes) { reportContent := reportContent # "  No disputes.\n" };
        reportContent := reportContent # "\nTRANSACTION HISTORY\n";
        var hasTxns = false;
        for ((_, t) in transactions.entries()) {
          if (t.propertyId == propertyId) {
            hasTxns := true;
            let tStatus = switch (t.status) { case (#initiated) { "Initiated" }; case (#completed) { "Completed" }; case (#disputed) { "Disputed" }; };
            reportContent := reportContent # "  [" # t.id # "] " # tStatus # " - KES " # t.price.toText() # "\n";
          };
        };
        if (not hasTxns) { reportContent := reportContent # "  No transactions.\n" };
        reportContent := reportContent # "\nMARKET VALUE: KES " # prop.value.toText() # "\n";
        let reportId = "RPT-" # propertyId # "-" # Time.now().toText();
        #ok({ reportId = reportId; content = reportContent; generatedAt = Time.now() })
      };
    };
  };
};
